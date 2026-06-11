import React, { useEffect, useState } from "react";
import { login } from '../../shared/Login/auth.js';

const COLORS = {
    pageBg: '#93a8ac',
    cardBg: '#b8cdd1',
    headerBg: '#7d9ea3',
    rowHover: '#ccdde0',
    inputBg: '#a8bfc3',
    border: '#7d9ea3',
    rowBorder: '#a3bbbf',
    textPrimary: '#2c3e42',
    textSecondary: '#4a6568',
    title: '#3d5a5e',
    link: '#2a5f6a',
    chipBg: '#93a8ac',
    activePg: '#4a7a80',
};

function getSource(url) {
    if (url.includes('svrs.rs.gov.br')) return 'RS';
    if (url.includes('sefaz.rs.gov.br')) return 'SEFAZ-RS';
    if (url.includes('sat.sef.sc.gov.br')) return 'SC';
    return '';
}

function StatusBadge({ status }) {
    const isOk = status === 'OK';
    const style = {
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20,
        background: isOk ? '#064e3b' : '#7f1d1d',
        color: isOk ? '#6ee7b7' : '#fca5a5',
    };
    return <span style={style}>● {status}</span>;
}

function SourceChip({ label }) {
    if (!label) return null;
    return (
        <span style={{
            display: 'inline-block', fontSize: 10, padding: '1px 6px',
            borderRadius: 4, marginLeft: 7,
            background: COLORS.chipBg, color: COLORS.textPrimary,
            border: `1px solid ${COLORS.border}`, verticalAlign: 'middle',
        }}>{label}</span>
    );
}

const PgBtn = ({ children, active, disabled, onClick }) => {
    const [hovered, setHovered] = React.useState(false);
    const style = {
        padding: '5px 12px', fontSize: 13, borderRadius: 7,
        border: `1px solid ${active ? COLORS.title : COLORS.border}`,
        background: active ? COLORS.activePg : hovered && !disabled ? COLORS.rowHover : COLORS.cardBg,
        color: active ? '#fff' : COLORS.textPrimary,
        fontWeight: active ? 600 : 400,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.35 : 1,
        minWidth: 34, textAlign: 'center',
        transition: 'background 0.12s',
    };

    return (
        <button
            style={style}
            disabled={disabled}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >{children}</button>
    );
}

const ReceiptsTable = () => {
    const [search, setSearch] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('');
    const [perPage, setPerPage] = React.useState(10);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedReceipts, setLoadedReceipts] = useState([]);

    const baseApiUrl = import.meta.env.VITE_API_URL;
    const url = `${baseApiUrl}/api/receipts/`;

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const email = import.meta.env.VITE_AUTH_EMAIL;
                const pwd = import.meta.env.VITE_AUTH_PWD;

                const loginResponse = await login(email, pwd);
                const token = loginResponse.accessToken;
                const receiptsResponse = await fetch(
                    url, {
                    method: 'GET',
                    headers: {
                        'accept': 'text/plain',
                        'authorization': `Bearer ${token}`
                    }
                });

                const response = await receiptsResponse.json();

                setLoadedReceipts(response);
            } catch (error) {
                console.log(error.message);
            }
            setIsLoading(false);
        }

        sendRequest();
    }, []);

    const filtered = React.useMemo(() => {

        const ALL_DATA = loadedReceipts.map(receipt => {
            return {
                date: receipt.receivedDate,
                url: receipt.url,
                status: receipt.processed ? 'OK' : 'ERROR'
            }
        });

        return ALL_DATA.filter(r => {
            const q = search.toLowerCase();
            const matchSearch = r.date.toLowerCase().includes(q) || r.url.toLowerCase().includes(q);
            const matchStatus = !statusFilter || r.status === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [search, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const safePage = Math.min(currentPage, totalPages);
    const pageData = filtered.slice((safePage - 1) * perPage, safePage * perPage);

    React.useEffect(() => { setCurrentPage(1); }, [search, statusFilter, perPage]);

    // Pagination page numbers
    const delta = 2;
    const left = Math.max(1, safePage - delta);
    const right = Math.min(totalPages, safePage + delta);
    const pageNums = [];
    for (let i = left; i <= right; i++) pageNums.push(i);

    const inputStyle = {
        padding: '8px 12px', fontSize: 13, borderRadius: 8,
        border: `1px solid ${COLORS.border}`,
        background: COLORS.inputBg, color: COLORS.textPrimary,
        outline: 'none',
    };

    return (
        <div style={{ background: COLORS.pageBg, minHeight: '100vh', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>

                {/* Title */}
                <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 600, color: COLORS.title, marginBottom: '1.75rem', letterSpacing: '0.02em' }}>
                    Receipts
                </h1>

                {/* Toolbar */}
                <div style={{ display: 'flex', gap: 10, marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search by URL or date…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ ...inputStyle, flex: 1, minWidth: 180 }}
                    />
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        style={inputStyle}
                    >
                        <option value="">All statuses</option>
                        <option value="OK">OK</option>
                        <option value="ERROR">Error</option>
                    </select>
                    <span style={{
                        fontSize: 12, background: COLORS.inputBg,
                        border: `1px solid ${COLORS.border}`, borderRadius: 20,
                        padding: '4px 12px', color: COLORS.title, whiteSpace: 'nowrap',
                    }}>
                        {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
                    </span>
                </div>

                {/* Table card */}
                <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 90px', background: COLORS.headerBg, borderBottom: `1px solid ${COLORS.border}` }}>
                        {['Date', 'URL', 'Status'].map(h => (
                            <span key={h} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: COLORS.textPrimary }}>
                                {h}
                            </span>
                        ))}
                    </div>

                    {/* Rows */}
                    {pageData.length === 0 ? (
                        <div style={{ padding: '2.5rem', textAlign: 'center', color: COLORS.textSecondary, fontSize: 13 }}>
                            No receipts match your filter.
                        </div>
                    ) : pageData.map((r, i) => {
                        const src = getSource(r.url);
                        return (
                            <Row key={i} r={r} src={src} isLast={i === pageData.length - 1} />
                        );
                    })}
                </div>

                {/* Per page + pagination */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: '0.75rem' }}>
                    <label style={{ fontSize: 12, color: COLORS.textSecondary }}>Rows per page:</label>
                    <select
                        value={perPage}
                        onChange={e => setPerPage(Number(e.target.value))}
                        style={{ ...inputStyle, padding: '4px 8px', fontSize: 12 }}
                    >
                        {[10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>

                {totalPages > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: '1rem', flexWrap: 'wrap' }}>
                        <PgBtn disabled={safePage === 1} onClick={() => setCurrentPage(1)}>«</PgBtn>
                        <PgBtn disabled={safePage === 1} onClick={() => setCurrentPage(p => p - 1)}>‹</PgBtn>

                        {left > 1 && <>
                            <PgBtn onClick={() => setCurrentPage(1)}>1</PgBtn>
                            {left > 2 && <span style={{ fontSize: 12, color: COLORS.textSecondary }}>…</span>}
                        </>}

                        {pageNums.map(n => (
                            <PgBtn key={n} active={n === safePage} onClick={() => setCurrentPage(n)}>{n}</PgBtn>
                        ))}

                        {right < totalPages && <>
                            {right < totalPages - 1 && <span style={{ fontSize: 12, color: COLORS.textSecondary }}>…</span>}
                            <PgBtn onClick={() => setCurrentPage(totalPages)}>{totalPages}</PgBtn>
                        </>}

                        <PgBtn disabled={safePage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>›</PgBtn>
                        <PgBtn disabled={safePage === totalPages} onClick={() => setCurrentPage(totalPages)}>»</PgBtn>

                        <span style={{ fontSize: 12, color: COLORS.textSecondary, margin: '0 6px' }}>
                            {(safePage - 1) * perPage + 1}–{Math.min(safePage * perPage, filtered.length)} of {filtered.length}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

const Row = ({ r, src, isLast }) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'grid', gridTemplateColumns: '110px 1fr 90px',
                borderBottom: isLast ? 'none' : `1px solid ${COLORS.rowBorder}`,
                background: hovered ? COLORS.rowHover : 'transparent',
                transition: 'background 0.12s',
            }}
        >
            <div style={{ padding: '10px 14px', fontSize: 12, color: COLORS.textSecondary, display: 'flex', alignItems: 'center', fontVariantNumeric: 'tabular-nums' }}>
                {r.date}
            </div>
            <div style={{ padding: '10px 14px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center' }}>
                <a href={r.url} target="_blank" rel="noreferrer" title={r.url}
                    style={{ color: COLORS.link, textDecoration: 'none', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.url}
                </a>
                <SourceChip label={src} />
            </div>
            <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center' }}>
                <StatusBadge status={r.status} />
            </div>
        </div>
    );
}

export default ReceiptsTable;