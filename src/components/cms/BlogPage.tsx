import React, { useState } from 'react';
import { Clock, User, ArrowRight, X, Sparkles } from 'lucide-react';
import { BlogPost } from '../../types/ecommerce';
import { StoreService } from '../../services/store';

export const BlogPage: React.FC = () => {
  const posts = StoreService.getBlogPosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="bg-[#F8EDE3]/30 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B67B8D]">
            The Comfort Journal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#5A3E36] mt-1.5">
            Fashion Editorial & Style Inspirations
          </h1>
          <p className="text-xs sm:text-sm text-[#5A3E36]/70 mt-2">
            Textile history, lawn care guides, and contemporary styling guides from our creative atelier.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8D8D1] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#F8EDE3]/40">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-[#5A3E36]/60 mb-2">
                    <span className="uppercase text-[10px] font-semibold text-[#B67B8D] tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#5A3E36] group-hover:text-[#B67B8D] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#5A3E36]/75 mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-100 text-xs text-[#5A3E36]/60">
                <span>By {post.author.split(',')[0]}</span>
                <span className="text-[#B67B8D] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Read Article →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Post Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#211A18]/60 backdrop-blur-sm" onClick={() => setSelectedPost(null)} />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-[#E8D8D1] z-10 max-h-[85vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
              <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B67B8D]">
                {selectedPost.category} · {selectedPost.publishedAt}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#5A3E36] mt-1 leading-tight">
                {selectedPost.title}
              </h2>
              <p className="text-xs text-[#5A3E36]/60 mt-1">Written by {selectedPost.author}</p>
            </div>

            <div className="text-xs sm:text-sm text-[#5A3E36]/80 leading-relaxed space-y-4 pt-4 border-t border-[#E8D8D1]">
              <p className="font-medium text-[#5A3E36] text-base">{selectedPost.excerpt}</p>
              <p>{selectedPost.content}</p>
              <p>
                When selecting fine lawn, always observe the yarn counts (typically 80s to 100s combed
                warp) and inspect the selvedge for consistent tension. In our atelier, all printed
                fabrics undergo reactive dye binding to resist color fade under intense summer sunlight.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8D8D1] flex flex-wrap gap-2">
              {selectedPost.tags.map((t) => (
                <span key={t} className="text-[11px] bg-[#F8EDE3] text-[#5A3E36] px-2.5 py-1 rounded-md">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
