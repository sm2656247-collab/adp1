import React, { useState } from 'react';
import { FileText, Plus, Trash2, Edit2, Sparkles, Image, Save } from 'lucide-react';
import { BlogPost } from '../../types/ecommerce';
import { StoreService } from '../../services/store';
import { useToast } from '../common/Toast';

export const AdminCMS: React.FC = () => {
  const { showToast } = useToast();
  const settings = StoreService.getSettings();
  const blogPosts = StoreService.getBlogPosts();

  // Content form
  const [heroHeadline, setHeroHeadline] = useState(settings.heroHeadline);
  const [heroSubheadline, setHeroSubheadline] = useState(settings.heroSubheadline);
  const [announcementText, setAnnouncementText] = useState(settings.announcementBarText);

  // Blog creation modal state
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Style Inspirations');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('Comfort Editorial Team');

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    StoreService.saveSettings({
      ...settings,
      heroHeadline,
      heroSubheadline,
      announcementBarText: announcementText,
    });
    showToast('Storefront editorial copy updated.', 'success');
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogExcerpt) return;

    StoreService.saveBlogPost({
      id: `blog-${Date.now()}`,
      title: blogTitle,
      slug: blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: blogExcerpt,
      content: blogContent,
      coverImage: '/src/assets/images/banner_craftsmanship_1790830594098.jpg',
      author: blogAuthor,
      category: blogCategory,
      tags: ['Editorial', 'Fashion', 'Lawn'],
      publishedAt: 'Today',
      readTime: '3 min read',
    });

    showToast('Blog article published to store.', 'success');
    setShowBlogModal(false);
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
  };

  const handleDeleteBlog = (id: string) => {
    StoreService.deleteBlogPost(id);
    showToast('Blog post removed.', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl text-xs text-gray-800">
      <div className="pb-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">CMS & Content Studio</h2>
        <p className="text-xs text-gray-500 mt-1">
          Update storefront banners, homepage hero headlines, and editorial blog articles.
        </p>
      </div>

      {/* Hero Banner CMS */}
      <form onSubmit={handleSaveCMS} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <Sparkles className="w-5 h-5 text-[#5A3E36]" />
          <h3 className="font-serif text-base font-bold text-gray-900">Homepage Hero & Banners</h3>
        </div>

        <div>
          <label className="block font-semibold mb-1">Top Announcement Bar Text</label>
          <input
            type="text"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Main Hero Headline *</label>
          <input
            type="text"
            value={heroHeadline}
            onChange={(e) => setHeroHeadline(e.target.value)}
            className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200 font-serif text-base"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Hero Sub-headline / Copy</label>
          <textarea
            rows={2}
            value={heroSubheadline}
            onChange={(e) => setHeroSubheadline(e.target.value)}
            className="w-full bg-gray-50 p-2.5 rounded-xl border border-gray-200"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#5A3E36] hover:bg-[#462F29] text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#FFD7C4]" />
            <span>Update Storefront Copy</span>
          </button>
        </div>
      </form>

      {/* Blog Articles CMS */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#5A3E36]" />
            <h3 className="font-serif text-base font-bold text-gray-900">
              Editorial Blog Articles ({blogPosts.length})
            </h3>
          </div>

          <button
            onClick={() => setShowBlogModal(true)}
            className="px-3.5 py-1.5 bg-[#5A3E36] text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#FFD7C4]" />
            <span>New Blog Article</span>
          </button>
        </div>

        <div className="space-y-3">
          {blogPosts.map((b) => (
            <div key={b.id} className="p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-gray-900">{b.title}</p>
                <p className="text-[11px] text-gray-500">
                  {b.category} · {b.readTime} · By {b.author}
                </p>
              </div>

              <button
                onClick={() => handleDeleteBlog(b.id)}
                className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg cursor-pointer"
                title="Delete article"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {showBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200 text-xs">
            <h3 className="font-serif text-lg font-bold text-gray-900">Publish New Editorial Article</h3>
            <form onSubmit={handleCreateBlog} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="w-full bg-gray-50 p-2.5 rounded-lg border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={blogCategory}
                  onChange={(e) => setBlogCategory(e.target.value)}
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200"
                >
                  <option value="Craftsmanship & Fabric Care">Craftsmanship & Fabric Care</option>
                  <option value="Style Inspirations">Style Inspirations</option>
                  <option value="Eid Capsule Collections">Eid Capsule Collections</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Full Article Content *</label>
                <textarea
                  rows={5}
                  required
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A3E36] text-white rounded-xl font-semibold"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
