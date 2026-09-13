'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import type { ResumeData } from '@/data/resumeData';

// Register Korean font (Noto Sans KR - reliable Google Fonts CDN)
Font.register({
    family: 'NotoSansKR',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-400-normal.ttf', fontWeight: 400 },
        { src: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-500-normal.ttf', fontWeight: 500 },
        { src: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-600-normal.ttf', fontWeight: 600 },
        { src: 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-700-normal.ttf', fontWeight: 700 },
    ],
});

const colors = {
    black: '#1e293b',
    darkGray: '#334155',
    gray: '#64748b',
    lightGray: '#94a3b8',
    border: '#cbd5e1',
    bgLight: '#f1f5f9',
    white: '#ffffff',
    accent: '#475569',
};

const s = StyleSheet.create({
    page: {
        fontFamily: 'NotoSansKR',
        fontSize: 9,
        color: colors.black,
        backgroundColor: colors.white,
        paddingTop: 36,
        paddingBottom: 36,
        paddingHorizontal: 40,
    },
    // Header
    title: { fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 16, letterSpacing: 6 },
    // Info table
    infoRow: { flexDirection: 'row', borderBottom: `0.5px solid ${colors.border}`, borderLeft: `0.5px solid ${colors.border}`, borderRight: `0.5px solid ${colors.border}` },
    infoRowFirst: { borderTop: `0.5px solid ${colors.border}` },
    infoLabel: { width: 70, backgroundColor: colors.bgLight, paddingVertical: 7, paddingHorizontal: 10, fontWeight: 600, fontSize: 8.5, borderRight: `0.5px solid ${colors.border}` },
    infoValue: { flex: 1, paddingVertical: 7, paddingHorizontal: 10, fontSize: 9 },
    infoValueBold: { fontWeight: 700, fontSize: 12 },
    // Summary
    summaryBox: { marginTop: 12, marginBottom: 16, padding: 10, backgroundColor: colors.bgLight, borderRadius: 3 },
    summaryText: { fontSize: 8.5, color: colors.darkGray, lineHeight: 1.5 },
    // Section
    sectionTitle: { fontSize: 13, fontWeight: 700, marginBottom: 8, paddingBottom: 4, borderBottom: `1.5px solid ${colors.black}` },
    // Education table
    tableHeader: { flexDirection: 'row', backgroundColor: colors.bgLight, borderTop: `0.5px solid ${colors.border}`, borderBottom: `0.5px solid ${colors.border}`, borderLeft: `0.5px solid ${colors.border}`, borderRight: `0.5px solid ${colors.border}` },
    tableRow: { flexDirection: 'row', borderBottom: `0.5px solid ${colors.border}`, borderLeft: `0.5px solid ${colors.border}`, borderRight: `0.5px solid ${colors.border}` },
    tableCell: { paddingVertical: 6, paddingHorizontal: 10, fontSize: 8.5 },
    tableCellBold: { fontWeight: 600 },
    // Experience
    companyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 4, paddingBottom: 4, borderBottom: `0.5px solid ${colors.border}` },
    companyName: { fontSize: 11, fontWeight: 700 },
    position: { fontSize: 8.5, color: colors.gray, marginTop: 1 },
    period: { fontSize: 8, color: colors.gray },
    projectBox: { marginLeft: 8, marginBottom: 6, paddingLeft: 8, borderLeft: `1.5px solid ${colors.border}` },
    projectTitle: { fontSize: 9, fontWeight: 600, marginBottom: 3 },
    projectDate: { fontSize: 7.5, color: colors.gray },
    bulletItem: { fontSize: 8.5, color: colors.darkGray, lineHeight: 1.5, marginBottom: 1, paddingLeft: 8 },
    // Skills table
    skillLabel: { width: 90, backgroundColor: colors.bgLight, paddingVertical: 6, paddingHorizontal: 10, fontWeight: 600, fontSize: 8.5, borderRight: `0.5px solid ${colors.border}` },
    skillValue: { flex: 1, paddingVertical: 6, paddingHorizontal: 10, fontSize: 8.5 },
    // Projects
    projCard: { marginBottom: 8, padding: 10, backgroundColor: colors.bgLight, borderRadius: 3 },
    projName: { fontSize: 10, fontWeight: 700, marginBottom: 2 },
    projLink: { fontSize: 7.5, color: colors.accent, marginBottom: 4 },
    projDesc: { fontSize: 8.5, color: colors.darkGray, lineHeight: 1.4, marginBottom: 4 },
    techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
    techTag: { fontSize: 7, backgroundColor: colors.white, color: colors.darkGray, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 8, border: `0.5px solid ${colors.border}` },
    mb10: { marginBottom: 10 },
    mb16: { marginBottom: 16 },
});

export const KoreanResumePDF = ({ data }: { data: ResumeData }) => (
    <Document>
        <Page size="A4" style={s.page}>
            {/* Title */}
            <Text style={s.title}>이 력 서</Text>

            {/* Personal Info Table */}
            <View style={[s.infoRow, s.infoRowFirst]}>
                <Text style={s.infoLabel}>성 명</Text>
                <Text style={[s.infoValue, s.infoValueBold]}>{data.name} ({data.nameEn})</Text>
            </View>
            <View style={s.infoRow}>
                <Text style={s.infoLabel}>생년월일</Text>
                <Text style={[s.infoValue, { flex: 0.5, borderRight: `0.5px solid ${colors.border}` }]}>{data.contact.birth}</Text>
                <Text style={[s.infoLabel, { borderLeft: 'none' }]}>연락처</Text>
                <Text style={[s.infoValue, { flex: 0.5 }]}>{data.contact.phone}</Text>
            </View>
            <View style={s.infoRow}>
                <Text style={s.infoLabel}>이메일</Text>
                <Text style={s.infoValue}>{data.contact.email}</Text>
            </View>
            <View style={s.infoRow}>
                <Text style={s.infoLabel}>주 소</Text>
                <Text style={s.infoValue}>{data.contact.address}</Text>
            </View>
            <View style={s.infoRow}>
                <Text style={s.infoLabel}>GitHub</Text>
                <Link src="https://github.com/kimmjen" style={[s.infoValue, { color: colors.accent }]}>github.com/kimmjen</Link>
            </View>

            {/* Summary */}
            <View style={s.summaryBox}>
                <Text style={s.summaryText}>&ldquo;{data.profile}&rdquo;</Text>
            </View>

            {/* Education */}
            <View style={s.mb16}>
                <Text style={s.sectionTitle}>학력사항</Text>
                <View style={s.tableHeader}>
                    <Text style={[s.tableCell, s.tableCellBold, { width: 120 }]}>기간</Text>
                    <Text style={[s.tableCell, s.tableCellBold, { flex: 1, borderLeft: `0.5px solid ${colors.border}` }]}>학교/기관명</Text>
                    <Text style={[s.tableCell, s.tableCellBold, { flex: 1, borderLeft: `0.5px solid ${colors.border}` }]}>전공/과정</Text>
                </View>
                {data.education.map((edu, i) => (
                    <View key={i} style={s.tableRow}>
                        <Text style={[s.tableCell, { width: 120, color: colors.gray }]}>{edu.period}</Text>
                        <Text style={[s.tableCell, s.tableCellBold, { flex: 1, borderLeft: `0.5px solid ${colors.border}` }]}>{edu.school}</Text>
                        <Text style={[s.tableCell, { flex: 1, color: colors.darkGray, borderLeft: `0.5px solid ${colors.border}` }]}>{edu.degree}</Text>
                    </View>
                ))}
            </View>

            {/* Experience */}
            <View style={s.mb16}>
                <Text style={s.sectionTitle}>경력사항</Text>
                {data.experience.map((exp, ei) => (
                    <View key={ei} style={s.mb10} wrap={false}>
                        <View style={s.companyRow}>
                            <View>
                                <Text style={s.companyName}>{exp.company}</Text>
                                <Text style={s.position}>{exp.position}</Text>
                            </View>
                            <Text style={s.period}>{exp.period}</Text>
                        </View>
                        {exp.projects.map((proj, pi) => (
                            <View key={pi} style={s.projectBox}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                                    <Text style={s.projectTitle}>{proj.title}</Text>
                                    {proj.date && <Text style={s.projectDate}>{proj.date}</Text>}
                                </View>
                                {proj.description.map((desc, di) => (
                                    <Text key={di} style={s.bulletItem}>• {desc}</Text>
                                ))}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </Page>

        <Page size="A4" style={s.page}>
            {/* Skills */}
            <View style={s.mb16}>
                <Text style={s.sectionTitle}>기술역량</Text>
                {data.skills.map((skill, i) => (
                    <View key={i} style={[s.tableRow, i === 0 ? s.infoRowFirst : {}]}>
                        <Text style={s.skillLabel}>{skill.category}</Text>
                        <Text style={s.skillValue}>{skill.items.join(', ')}</Text>
                    </View>
                ))}
            </View>

            {/* Projects */}
            <View>
                <Text style={s.sectionTitle}>프로젝트</Text>
                {data.projects.filter(p => p.type === '개인 프로젝트' || p.type === 'Personal Project').map((proj, i) => (
                    <View key={i} style={s.projCard} wrap={false}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Text style={s.projName}>{proj.title}</Text>
                            {proj.period && <Text style={s.period}>{proj.period}</Text>}
                        </View>
                        {proj.link && <Link src={proj.link} style={s.projLink}>{proj.link}</Link>}
                        <Text style={s.projDesc}>{proj.description}</Text>
                        {proj.technologies && (
                            <View style={s.techRow}>
                                {proj.technologies.map((tech, ti) => (
                                    <Text key={ti} style={s.techTag}>{tech}</Text>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export const EnglishResumePDF = ({ data }: { data: ResumeData }) => (
    <Document>
        <Page size="A4" style={s.page}>
            {/* Header */}
            <Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 2 }}>{data.name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 12, paddingBottom: 8, borderBottom: `1.5px solid ${colors.black}` }}>
                <Text style={{ fontSize: 8.5, color: colors.gray }}>{data.contact.email}</Text>
                <Text style={{ fontSize: 8.5, color: colors.border }}>|</Text>
                <Link src="https://github.com/kimmjen" style={{ fontSize: 8.5, color: colors.gray }}>github.com/kimmjen</Link>
                <Text style={{ fontSize: 8.5, color: colors.border }}>|</Text>
                <Link src="https://kimmjen.github.io/kimmjen-portfolio/" style={{ fontSize: 8.5, color: colors.gray }}>Portfolio</Link>
            </View>

            {/* Professional Summary */}
            <View style={s.mb10}>
                <Text style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 4, paddingBottom: 3, borderBottom: `0.5px solid ${colors.border}` }}>Professional Summary</Text>
                <Text style={{ fontSize: 9, color: colors.darkGray, lineHeight: 1.5 }}>{data.profile}</Text>
            </View>

            {/* Experience */}
            <View style={s.mb10}>
                <Text style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 6, paddingBottom: 3, borderBottom: `0.5px solid ${colors.border}` }}>Experience</Text>
                {data.experience.map((exp, ei) => (
                    <View key={ei} style={{ marginBottom: 8 }} wrap={false}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 3 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
                                <Text style={{ fontSize: 10, fontWeight: 700 }}>{exp.company}</Text>
                                <Text style={{ fontSize: 9, color: colors.gray }}>— </Text>
                                <Text style={{ fontSize: 9, color: colors.darkGray }}>{exp.position}</Text>
                            </View>
                            <Text style={{ fontSize: 8, color: colors.gray }}>{exp.period}</Text>
                        </View>
                        {exp.projects.map((proj, pi) => (
                            <View key={pi} style={{ marginLeft: 8, marginBottom: 4 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
                                    <Text style={{ fontSize: 9, fontWeight: 600 }}>{proj.title}</Text>
                                    {proj.date && <Text style={{ fontSize: 7.5, color: colors.gray }}>({proj.date})</Text>}
                                </View>
                                {proj.description.slice(0, 3).map((desc, di) => (
                                    <Text key={di} style={s.bulletItem}>• {desc}</Text>
                                ))}
                            </View>
                        ))}
                    </View>
                ))}
            </View>

            {/* Technical Skills */}
            <View style={s.mb10}>
                <Text style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 4, paddingBottom: 3, borderBottom: `0.5px solid ${colors.border}` }}>Technical Skills</Text>
                {data.skills.map((skill, i) => (
                    <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={{ fontSize: 9, fontWeight: 600, width: 90 }}>{skill.category}:</Text>
                        <Text style={{ fontSize: 9, color: colors.darkGray, flex: 1 }}>{skill.items.join(', ')}</Text>
                    </View>
                ))}
            </View>

            {/* Projects */}
            <View style={s.mb10}>
                <Text style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 6, paddingBottom: 3, borderBottom: `0.5px solid ${colors.border}` }}>Selected Projects</Text>
                {data.projects.filter(p => p.type === '개인 프로젝트' || p.type === 'Personal Project').map((proj, i) => (
                    <View key={i} style={{ marginBottom: 6 }} wrap={false}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 1 }}>
                            <Text style={{ fontSize: 10, fontWeight: 700 }}>{proj.title}</Text>
                            {proj.period && <Text style={{ fontSize: 8, color: colors.gray }}>{proj.period}</Text>}
                        </View>
                        {proj.link && <Link src={proj.link} style={{ fontSize: 7.5, color: colors.gray, marginBottom: 2 }}>{proj.link}</Link>}
                        <Text style={{ fontSize: 8.5, color: colors.darkGray, lineHeight: 1.4, marginBottom: 2 }}>{proj.description}</Text>
                        {proj.technologies && (
                            <Text style={{ fontSize: 7.5, color: colors.gray }}><Text style={{ fontWeight: 600, color: colors.darkGray }}>Tech: </Text>{proj.technologies.join(', ')}</Text>
                        )}
                    </View>
                ))}
            </View>

            {/* Education */}
            <View>
                <Text style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 3, marginBottom: 4, paddingBottom: 3, borderBottom: `0.5px solid ${colors.border}` }}>Education</Text>
                {data.education.map((edu, i) => (
                    <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
                            <Text style={{ fontSize: 9, fontWeight: 600 }}>{edu.school}</Text>
                            <Text style={{ fontSize: 9, color: colors.darkGray }}>— {edu.degree}</Text>
                        </View>
                        <Text style={{ fontSize: 8, color: colors.gray }}>{edu.period}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);
