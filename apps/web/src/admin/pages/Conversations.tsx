import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, Send } from 'lucide-react';
import type { ChatMessageDto } from '@eyb/shared';
import { api, ApiError } from '../lib/client';
import { useAuth } from '../lib/auth';
import { initials, firstName } from '../lib/text';
import s from '../styles/admin.module.scss';

const Conversations: React.FC = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [params] = useSearchParams();
  const tutor = user?.name?.trim() || 'tú';

  const { data: students } = useQuery({
    queryKey: ['admin', 'students'],
    queryFn: api.listStudents,
  });

  const [selected, setSelected] = useState<string | null>(params.get('student'));
  const [draft, setDraft] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  // Default to the first student once the list loads.
  useEffect(() => {
    if (!selected && students && students.length) setSelected(students[0].id);
  }, [students, selected]);

  const { data: thread } = useQuery({
    queryKey: ['admin', 'student', selected, 'chat'],
    queryFn: () => api.getStudentChat(selected as string),
    enabled: Boolean(selected),
  });

  // Fetching a thread clears that student's unread on the server → refresh badges.
  useEffect(() => {
    if (thread) void qc.invalidateQueries({ queryKey: ['admin', 'students'] });
  }, [thread, qc]);

  // Autoscroll to the newest message (never scrollIntoView).
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [thread]);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const reply = useMutation({
    mutationFn: (text: string) => api.replyStudentChat(selected as string, text),
    onSuccess: (_msg, _text) => {
      setDraft('');
      void qc.invalidateQueries({ queryKey: ['admin', 'student', selected, 'chat'] });
      const st = students?.find((x) => x.id === selected);
      notify(`${firstName(st?.name ?? '')} verá tu respuesta en su chat del portal.`);
    },
    onError: (err) => notify(err instanceof ApiError ? err.message : String(err)),
  });

  const send = () => {
    if (draft.trim() && selected) reply.mutate(draft.trim());
  };

  const current = students?.find((x) => x.id === selected);

  return (
    <div className={s.page}>
      <header className={s.pageHead}>
        <div>
          <h1>Conversaciones</h1>
          <p className={s.pageSub}>
            Lo que cada estudiante habla con la IA. Puedes intervenir cuando quieras: tu
            respuesta aparece en el chat del estudiante.
          </p>
        </div>
      </header>

      <div className={s.chatLayout}>
        {/* List */}
        <div className={s.chatList}>
          <div className={s.chatListHead}>Estudiantes</div>
          {students?.map((st) => (
            <button
              key={st.id}
              type="button"
              className={`${s.chatListItem} ${st.id === selected ? s.chatListItemActive : ''}`}
              onClick={() => setSelected(st.id)}
            >
              <span className={s.avatarSm}>{initials(st.name)}</span>
              <span className={s.chatListMeta}>
                <strong className={s.chatListName}>{st.name}</strong>
                <small className={s.chatListPreview}>
                  {st.lastMessagePreview ?? 'Sin mensajes aún'}
                </small>
              </span>
              {st.unread > 0 && <span className={s.chatListUnread}>{st.unread}</span>}
            </button>
          ))}
        </div>

        {/* Thread */}
        <div className={s.chatThread}>
          {current ? (
            <>
              <div className={s.chatThreadHead}>
                <div className={s.chatThreadWho}>
                  <span className={s.avatarSm}>{initials(current.name)}</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: '#35494c', fontWeight: 700 }}>
                      {current.name}
                    </strong>
                    <small style={{ fontSize: '0.72rem', color: '#67797c' }}>
                      Nivel {current.level} · chat con Buddy (IA)
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  className={s.btnSoft}
                  onClick={() => navigate(`/students/${current.id}`)}
                >
                  Ver ficha
                </button>
              </div>

              <div className={s.chatMessages} ref={threadRef}>
                {thread?.map((m) => (
                  <MessageRow key={m.id} msg={m} studentName={current.name} tutor={tutor} />
                ))}
              </div>

              <div className={s.chatComposer}>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder={`Responder como ${tutor} — el estudiante lo verá en su chat…`}
                />
                <button
                  type="button"
                  className={s.btnPrimary}
                  onClick={send}
                  disabled={reply.isPending || !draft.trim()}
                >
                  <Send size={14} /> Responder
                </button>
              </div>
            </>
          ) : (
            <div className={s.center}>Selecciona un estudiante para ver su conversación.</div>
          )}
        </div>
      </div>

      {toast && (
        <div className={s.toast} role="status">
          <Check size={15} /> {toast}
        </div>
      )}
    </div>
  );
};

const MessageRow: React.FC<{ msg: ChatMessageDto; studentName: string; tutor: string }> = ({
  msg,
  studentName,
  tutor,
}) => {
  const meta =
    msg.from === 'student'
      ? { row: s.chatMsgStudent, sender: s.chatSenderStudent, bubble: s.chatBubbleStudent, label: firstName(studentName) }
      : msg.from === 'teacher'
        ? { row: s.chatMsgOther, sender: s.chatSenderTeacher, bubble: s.chatBubbleTeacher, label: `${tutor} (tú)` }
        : { row: s.chatMsgOther, sender: s.chatSenderAi, bubble: s.chatBubbleAi, label: 'Buddy (IA)' };
  return (
    <div className={`${s.chatMsgRow} ${meta.row}`}>
      <span className={`${s.chatSender} ${meta.sender}`}>{meta.label}</span>
      <div className={`${s.chatBubble} ${meta.bubble}`}>{msg.text}</div>
    </div>
  );
};

export default Conversations;
