import React, { useState, useEffect } from 'react';
import { 
  fetchAllLeads, 
  updateLeadStatus, 
  deleteLeadRecord, 
  LeadRecord 
} from '../services/firebase';
import { 
  Users, 
  RefreshCw, 
  Search, 
  Filter, 
  Trash2, 
  Clock, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Download,
  Send,
  Zap,
  BookOpen,
  Calculator,
  SearchCheck
} from 'lucide-react';
import { getOfflineLeads, flushOfflineQueue } from '../utils/offlineSync';

export const CRMLeadsPanel: React.FC = () => {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [offlineCount, setOfflineCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllLeads();
      setLeads(data);
      setOfflineCount(getOfflineLeads().length);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: LeadRecord['status']) => {
    const success = await updateLeadStatus(id, newStatus);
    if (success) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Czy na pewno chcesz usunąć to zgłoszenie z bazy?')) return;
    const success = await deleteLeadRecord(id);
    if (success) {
      setLeads(prev => prev.filter(l => l.id !== id));
      if (selectedLead && selectedLead.id === id) setSelectedLead(null);
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    await flushOfflineQueue();
    await loadLeads();
    setIsSyncing(false);
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Data', 'E-mail', 'Imię/Firma', 'Telefon', 'Źródło', 'Status', 'Wiadomość / Usługi'];
    const rows = leads.map(l => [
      l.id || '',
      l.createdAt,
      l.email,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      l.phone || '',
      l.source,
      l.status,
      `"${(l.message || l.selectedServices || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_synapse_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.name && lead.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.message && lead.message.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const countNew = leads.filter(l => l.status === 'new').length;
  const countContacted = leads.filter(l => l.status === 'contacted').length;
  const countQuoted = leads.filter(l => l.status === 'quoted').length;
  const countClosed = leads.filter(l => l.status === 'closed').length;

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'quiz': return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'roi_calculator': return <Calculator className="w-3.5 h-3.5 text-cyan-400" />;
      case 'ebook_generator': return <BookOpen className="w-3.5 h-3.5 text-purple-400" />;
      case 'audit': return <SearchCheck className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <Mail className="w-3.5 h-3.5 text-sky-400" />;
    }
  };

  const getStatusBadge = (status: LeadRecord['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Nowy</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">W kontakcie</span>;
      case 'quoted':
        return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">Wyceniony</span>;
      case 'closed':
        return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Zamknięty</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-2xl">
          <p className="text-xs font-mono text-slate-400">Nowe zapytania</p>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{countNew}</div>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-2xl">
          <p className="text-xs font-mono text-slate-400">W trakcie kontaktu</p>
          <div className="text-2xl font-bold text-amber-400 mt-1">{countContacted}</div>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-2xl">
          <p className="text-xs font-mono text-slate-400">Oferty wysłane</p>
          <div className="text-2xl font-bold text-purple-400 mt-1">{countQuoted}</div>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-2xl">
          <p className="text-xs font-mono text-slate-400">Zamknięte sukcesem</p>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{countClosed}</div>
        </div>
      </div>

      {/* Offline sync banner if pending */}
      {offlineCount > 0 && (
        <div className="flex items-center justify-between p-3.5 bg-amber-500/15 border border-amber-400/40 rounded-xl text-amber-300 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Wykryto {offlineCount} zgłoszeń zapisanych lokalnie w kolejce offline PWA.</span>
          </div>
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition"
          >
            {isSyncing ? 'Synchronizuję...' : 'Synchronizuj teraz'}
          </button>
        </div>
      )}

      {/* Control Bar: Search + Filters + Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Szukaj po e-mail, nazwisku lub treści..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="all">Wszystkie statusy</option>
            <option value="new">Nowy</option>
            <option value="contacted">W kontakcie</option>
            <option value="quoted">Wyceniony</option>
            <option value="closed">Zamknięty</option>
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={e => setSourceFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="all">Wszystkie źródła</option>
            <option value="contact_form">Formularz WWW</option>
            <option value="quiz">Quiz biznesowy</option>
            <option value="roi_calculator">Kalkulator ROI</option>
            <option value="ebook_generator">Generator E-booka</option>
            <option value="audit">Audyt AI</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={loadLeads}
            title="Odśwież z Firestore"
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            title="Eksportuj do CSV"
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Main Table & Details Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className={`lg:col-span-${selectedLead ? '2' : '3'} space-y-3`}>
          {isLoading && leads.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-mono text-sm">
              Ładowanie danych z bazy Firestore...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-slate-400 bg-slate-800/40 rounded-2xl border border-slate-700/50">
              <Users className="w-8 h-8 mx-auto text-slate-500 mb-2" />
              <p className="text-sm">Brak zgłoszeń spełniających wybrane kryteria.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/60">
              {filteredLeads.map(lead => {
                const isSelected = selectedLead?.id === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/50 transition ${
                      isSelected ? 'bg-cyan-500/10 border-l-4 border-cyan-400' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-1 p-2 rounded-xl bg-slate-800 border border-slate-700/80">
                        {getSourceIcon(lead.source)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-white truncate">
                            {lead.name || lead.email}
                          </span>
                          {getStatusBadge(lead.status)}
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {lead.email} {lead.phone ? `• ${lead.phone}` : ''}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono mt-1">
                          {new Date(lead.createdAt).toLocaleString('pl-PL')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <select
                        value={lead.status}
                        onClick={e => e.stopPropagation()}
                        onChange={e => handleStatusChange(lead.id!, e.target.value as LeadRecord['status'])}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="new">Nowy</option>
                        <option value="contacted">W kontakcie</option>
                        <option value="quoted">Wyceniony</option>
                        <option value="closed">Zamknięty</option>
                      </select>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(lead.id!);
                        }}
                        title="Usuń"
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Lead Details Drawer / Card */}
        {selectedLead && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4 h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h4 className="font-bold text-white text-base">Szczegóły zgłoszenia</h4>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Zamknij podgląd
              </button>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Klient</span>
              <p className="text-sm font-semibold text-white mt-0.5">{selectedLead.name || 'Brak imienia'}</p>
              <a 
                href={`mailto:${selectedLead.email}`} 
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 mt-1"
              >
                <Mail className="w-3.5 h-3.5" />
                {selectedLead.email}
              </a>
              {selectedLead.phone && (
                <a 
                  href={`tel:${selectedLead.phone}`} 
                  className="text-xs text-slate-300 hover:underline flex items-center gap-1 mt-1"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedLead.phone}
                </a>
              )}
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Źródło & Data</span>
              <p className="text-xs text-slate-200 mt-0.5 capitalize">
                {selectedLead.source.replace('_', ' ')}
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                {new Date(selectedLead.createdAt).toLocaleString('pl-PL')}
              </p>
            </div>

            {selectedLead.message && (
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Treść wiadomości</span>
                <div className="mt-1 p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-200 whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>
            )}

            {selectedLead.selectedServices && (
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Wybrane usługi / koszyk</span>
                <div className="mt-1 p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-cyan-300 whitespace-pre-wrap font-mono">
                  {selectedLead.selectedServices}
                </div>
              </div>
            )}

            {selectedLead.details && (
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Dodatkowe dane (AI / Quiz / ROI)</span>
                <pre className="mt-1 p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-[11px] text-slate-300 overflow-x-auto max-h-48 font-mono">
                  {typeof selectedLead.details === 'string'
                    ? selectedLead.details
                    : JSON.stringify(selectedLead.details, null, 2)}
                </pre>
              </div>
            )}

            <div className="pt-2 border-t border-slate-700 flex gap-2">
              <a
                href={`mailto:${selectedLead.email}?subject=Odpowiedź na zapytanie - Synapse Creative`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Napisz e-mail</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
