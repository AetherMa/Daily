import { useState } from 'react';
import { HeartHandshake, CalendarHeart, Pencil, Trash2, Plus } from 'lucide-react';

export default function MemoriesSidebar({ memories = [], onAdd, onUpdate, onDelete }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ date: '', title: '', note: '' });
  const [error, setError] = useState('');

  const resetForm = () => {
    setFormData({ date: '', title: '', note: '' });
    setError('');
  };

  const openAddForm = () => {
    setEditing(null);
    resetForm();
    setFormOpen(true);
  };

  const openEditForm = (memory) => {
    setEditing(memory);
    setFormData({
      date: memory?.date || '',
      title: memory?.title || '',
      note: memory?.note || memory?.description || ''
    });
    setError('');
    setFormOpen(true);
  };

  const handleDelete = (memory) => {
    if (!onDelete) return;
    const ok = window.confirm('确定要删除这个日子吗？');
    if (ok) {
      onDelete(memory.id);
      if (editing?.id === memory.id) {
        setFormOpen(false);
        setEditing(null);
        resetForm();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = formData.title.trim();
    const date = formData.date.trim();
    const note = formData.note.trim();
    if (!title || !date) {
      setError('日期和标题不能为空');
      return;
    }
    const payload = { title, date, note };
    if (editing) {
      onUpdate?.(editing.id, payload);
    } else {
      onAdd?.(payload);
    }
    setFormOpen(false);
    setEditing(null);
    resetForm();
  };

  const handleCancel = () => {
    setFormOpen(false);
    setEditing(null);
    resetForm();
  };

  return (
    <aside className="paper-card rounded-3xl p-4 shadow-soft space-y-4">
      <div className="flex items-center gap-2">
        <HeartHandshake className="text-dusk" />
        <div>
          <p className="text-lg font-semibold">回忆清单</p>
          <p className="text-sm text-dusk/70">重要的日子，别忘了庆祝</p>
        </div>
      </div>

      <div className="space-y-3">
        {memories.map((item) => (
          <div
            key={item.id || item.date}
            className="rounded-2xl bg-white/90 border border-white/60 p-3 shadow-soft"
          >
            <div className="flex gap-3 justify-between">
              <div className="flex gap-3">
                <CalendarHeart className="mt-1 text-blush shrink-0" />
                <div>
                  <p className="font-semibold text-dusk">{item.title}</p>
                  <p className="text-sm text-dusk/70">
                    {item.note || item.description || '这一天值得被记录下来。'}
                  </p>
                  <p className="text-xs text-dusk/50 mt-1">{item.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <button
                  type="button"
                  onClick={() => openEditForm(item)}
                  className="h-8 w-8 rounded-xl bg-sand flex items-center justify-center shadow-soft text-dusk/70 hover:text-dusk"
                  aria-label="编辑"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="h-8 w-8 rounded-xl bg-white border border-dusk/10 flex items-center justify-center shadow-soft text-blush hover:text-red-500"
                  aria-label="删除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {!memories.length && (
          <p className="text-sm text-dusk/60 bg-white/80 border border-white/50 rounded-2xl p-3 shadow-soft">
            还没有重要的日子，点击下方按钮添加一个吧。
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={openAddForm}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-sand px-3 py-2 shadow-soft text-dusk hover:shadow-md"
      >
        <Plus className="w-4 h-4" />
        添加重要日子
      </button>

      {formOpen && (
        <div className="rounded-2xl bg-white/95 border border-white/60 p-4 shadow-soft">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-dusk/70 mb-1 block">日期</label>
              <input
                type="text"
                className="w-full rounded-xl border border-dusk/15 bg-white/90 p-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-blush/60"
                placeholder="例如 02-14 或 2024-02-14"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm text-dusk/70 mb-1 block">标题</label>
              <input
                type="text"
                className="w-full rounded-xl border border-dusk/15 bg-white/90 p-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-blush/60"
                placeholder="例如 情人节"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm text-dusk/70 mb-1 block">备注</label>
              <input
                type="text"
                className="w-full rounded-xl border border-dusk/15 bg-white/90 p-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-blush/60"
                placeholder="写一句小小的心情备注"
                value={formData.note}
                onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
              />
            </div>
            {error && <p className="text-xs text-blush">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl bg-white border border-dusk/10 text-dusk/80 hover:bg-sand"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-dusk text-cream shadow-soft hover:shadow-lg transition"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      )}
    </aside>
  );
}
