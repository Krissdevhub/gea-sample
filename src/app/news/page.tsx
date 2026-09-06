
import React from 'react';
import { db } from '@/lib/db';

export default async function NewsPage() {
  let articles: Awaited<ReturnType<typeof db.newsArticle.findMany>> = [];
  try {
    articles = await db.newsArticle.findMany({
      orderBy: { publishedAt: 'desc' },
    });
  } catch { /* DB not available in demo mode */ }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-700">Media & Statements</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-1">News & Press Releases</h1>
        <p className="text-slate-600 text-sm mt-1">Official statements, media coverage, and cadre updates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <div key={art.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-teal-700 uppercase">{art.category}</span>
              <span className="text-xs text-slate-500">{art.publishedAt.toLocaleDateString()}</span>
            </div>
            <h3 className="font-bold text-lg text-navy-900">{art.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{art.excerpt}</p>
            <p className="text-xs text-slate-700 pt-3 border-t border-slate-100">{art.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
