import React, { useState, useEffect } from 'react';
import { BookMarked, Calendar, Plus, Edit2, Trash2, Check, X, Save, Clock, Search } from 'lucide-react';
import { DiaryEntry } from '../types';
import { StorageService } from '../services/storageService';

interface DiarySectionProps {
  storyCode: string;
}

export const DiarySection: React.FC<DiarySectionProps> = ({ storyCode }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().split('T')[0]);
  const [titleInput, setTitleInput] = useState<string>('');
  const [contentInput, setContentInput] = useState<string>('');
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDate, setEditDate] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  const loadEntries = () => {
    setEntries(StorageService.getDiaryEntries());
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentInput.trim()) return;

    StorageService.saveDiaryEntry({
      date: dateInput,
      storyCode,
      title: titleInput.trim() || undefined,
      content: contentInput.trim(),
    });

    setContentInput('');
    setTitleInput('');
    loadEntries();
    triggerNotification('Dagboeknotitie succesvol opgeslagen!');
  };

  const startEdit = (entry: DiaryEntry) => {
    setEditingEntryId(entry.id);
    setEditDate(entry.date);
    setEditTitle(entry.title || '');
    setEditContent(entry.content);
  };

  const cancelEdit = () => {
    setEditingEntryId(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleSaveEdit = (id: string) => {
    if (!editContent.trim()) return;

    StorageService.saveDiaryEntry({
      id,
      date: editDate,
      storyCode,
      title: editTitle.trim() || undefined,
      content: editContent.trim(),
    });

    setEditingEntryId(null);
    loadEntries();
    triggerNotification('Dagboeknotitie bijgewerkt!');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Weet je zeker dat je deze notitie wilt verwijderen?')) {
      StorageService.deleteDiaryEntry(id);
      loadEntries();
      triggerNotification('Notitie verwijderd.');
    }
  };

  const filteredEntries = entries.filter((entry) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      entry.content.toLowerCase().includes(q) ||
      (entry.title && entry.title.toLowerCase().includes(q)) ||
      entry.date.includes(q)
    );
  });

  const formatDateDutch = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      return new Intl.DateTimeFormat('nl-NL', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="diary-card" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-100">
            📔
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Dagboek & Voortgangsnotities
            </h2>
            <p className="text-[11px] text-slate-500">
              Persoonlijke notities, leermomenten en reflecties bij je User Story
            </p>
          </div>
        </div>

        <span className="text-xs font-medium text-slate-400 self-start sm:self-auto">
          {entries.length} {entries.length === 1 ? 'notitie' : 'notities'}
        </span>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Add New Diary Entry Form */}
      <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
          <Plus className="w-3.5 h-3.5 text-indigo-600" />
          Nieuwe dagboeknotitie
        </h3>

        <form onSubmit={handleSaveNew} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 block">
                Datum
              </label>
              <input
                type="date"
                required
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 block">
                Onderwerp / Titel (optioneel)
              </label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="Bijv. Eerste 5 bronnen geanalyseerd op betrouwbaarheid..."
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 block">
              Notitie <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              placeholder="Aan de slag gegaan met de AI-trends in B2C. Eerste bronnen geanalyseerd..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              id="btn-save-diary"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Opslaan</span>
            </button>
          </div>
        </form>
      </div>

      {/* Previous Diary Entries List */}
      <div className="space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
            <BookMarked className="w-3.5 h-3.5 text-indigo-600" />
            Notities & Tijdlijn
          </h3>

          {entries.length > 2 && (
            <div className="relative w-full sm:w-52">
              <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Zoek in notities..."
                className="w-full text-xs pl-7 pr-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        {filteredEntries.length === 0 ? (
          <div className="text-center py-8 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <BookMarked className="w-7 h-7 text-slate-300 mx-auto mb-1.5" />
            <p className="text-xs font-medium text-slate-600">Nog geen notities opgeslagen</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Gebruik het formulier hierboven om je eerste leermoment vast te leggen.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredEntries.map((entry) => {
              const isEditing = editingEntryId === entry.id;

              return (
                <div
                  key={entry.id}
                  id={`diary-entry-${entry.id}`}
                  className="bg-white rounded-xl p-3.5 border border-slate-200 hover:border-slate-300 transition-colors space-y-2"
                >
                  {isEditing ? (
                    /* Edit Mode */
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                            Datum
                          </label>
                          <input
                            type="date"
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            className="w-full text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                            Titel
                          </label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <textarea
                          rows={3}
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                          Annuleren
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(entry.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          <Save className="w-3 h-3" />
                          <span>Opslaan</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Display Mode */
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100 text-xs">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-indigo-600">
                            {formatDateDutch(entry.date)}:
                          </span>
                          {entry.title && (
                            <span className="font-semibold text-slate-900">
                              {entry.title}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(entry)}
                            className="text-slate-400 hover:text-indigo-600 p-1 rounded hover:bg-slate-50 transition-colors"
                            title="Bewerken"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(entry.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors"
                            title="Verwijderen"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <p className="pt-1.5 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                        {entry.content}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
