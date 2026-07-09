"use client";

import { useState, useEffect, useRef } from "react";

// 📸 รูปโปรไฟล์ (ตั้งชื่อไฟล์รูปในโฟลเดอร์ public ว่า jukdum-profile.jpg นะครับ)
const PROFILE_IMAGE_URL = "/jukdum-profile.jpg";

const projectData = [
  { id: 1, title: "คลิปขายกางเกง", category: "🎬 รีวิวกางเกง", desc: "รับหน้าที่เป็นทั้งคนเซ็ตมุมกล้อง จัดแสง และตัดต่อคลิปทั้งหมดด้วยตัวเอง", link: "https://drive.google.com/file/d/1bC7gcTked6fdxDIzoMFKHEXxV6tAQ3lb/view?usp=drive_link" },
  { id: 2, title: "พรีวิวกางเกง", category: "🎬 โชว์กางเกง", desc: "วางโครงเรื่อง เป็นคนเซ็ต ถ่ายทำ ตัดต่อ และคิดคำพูดโฆษณา (Copywriting) ทั้งหมด", link: "https://drive.google.com/file/d/1JANy1DLjIqkH6oi30PVvTdBuGmC6JJ9L/view?usp=drive_link" },
  { id: 3, title: "พรีวิวกางเกง 2", category: "🎬 โชว์กางเกง", desc: "ดูแลการถ่ายทำและตัดต่อ พร้อมทั้งเพิ่มลูกเล่นการปรับแต่งโทนสี (Color Grading) ให้คลิปดูน่าสนใจขึ้น", link: "https://drive.google.com/file/d/1E14SC0msvEL_qc1X1RHKToDJW9k93T6i/view?usp=drive_link" },
  { id: 4, title: "ขายเสื้อใน", category: "💥 คอนเทนต์แนวตลก", desc: "คิดคำพูดและดำเนินเรื่องแนวตลกขบขันเพื่อดึงดูดสายตาคนดู พร้อมเทคนิคการตัดต่อสับมุมกล้องให้กระชับฉับไว", link: "https://drive.google.com/file/d/12qIcdY5qTBk_3MnFw00Qe5nki_0szZrk/view?usp=drive_link" },
  { id: 5, title: "ขายขาจับจอ", category: "🖥️ รีวิวสินค้าไอที", desc: "โปรเจกต์รีวิวขาจับจอคอมพิวเตอร์ วางแผน ถ่ายทำ บรรยาย และตัดต่อเองทุกกระบวนการ (Solo Project)", link: "https://drive.google.com/file/d/1H9Koxdt8oOm0MUJL2eSrnyWVhMk8rh47/view?usp=drive_link" },
  { id: 6, title: "โปรเจกต์องค์กรโลกร้อน", category: "🌍 วิดีโอนำเสนอแผนงาน", desc: "หนังสั้น/คลิปสั้นนำเสนอเนื้อหาพิเศษเพื่อส่งมอบและพรีเซนต์ให้กับทางองค์การโลกร้อน ลงมือทำเองทั้งหมด", link: "https://drive.google.com/file/d/1XEnmHo8hyDcM3XkgQyC_0YiOreJ1JBHp/view?usp=drive_link" },
  { id: 7, title: "คลิปไฮไลต์เกม", category: "🎮 คอนเทนต์บันเทิง", desc: "ตัดต่อคลิปเล่นเกมสนุกๆ ลงช่องส่วนตัว ฝึกฝนจังหวะเอนเตอร์เทนและการใส่เอฟเฟกต์เสียง", link: "https://drive.google.com/file/d/1yeYozAXuWlgGs3UmKLk_ZQD5BvBeVTy_/view?usp=drive_link" }
];

const skillsData = [
  { icon: "🎬", name: "Video Editing", desc: "ตัดต่อกระชับ เล่าเรื่องสนุก จังหวะน่าติดตาม" },
  { icon: "🎥", name: "Camera & Lighting", desc: "เซ็ตมุมกล้องเป๊ะ จัดแสงสวย ดึงดูดสายตา" },
  { icon: "🎤", name: "Live & Presentation", desc: "นำเสนอเป็นธรรมชาติ เอนเตอร์เทนดี ปิดการขายได้" },
  { icon: "💡", name: "Creative Content", desc: "คิดไอเดียสดใหม่ ทันกระแส ดึงยอดวิว" }
];

const LOADING_LINES = [
  "> INITIALIZING JUKDUM PORTFOLIO CORE...",
  "> LOADING STARLIGHT MESH ENGINES...",
  "> CORE SKILLS ACTIVE: VIDEO EDITING, CONTENT CREATION, LIVE SALES...",
  "> RENDERING BENTO GRID & FLOATING AVATAR...",
  "> SYSTEM STATUS: ONLINE"
];

function ScrollReveal({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)" }}>{children}</div>;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [terminalLines, setTerminalLines] = useState([]);
  const [fadeLoading, setFadeLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < LOADING_LINES.length) {
        setTerminalLines(prev => [...prev, LOADING_LINES[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setFadeLoading(true), 500);
        setTimeout(() => setIsLoading(false), 1000);
      }
    }, 350);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#050806', color: '#f3f4f6', minHeight: '100vh', fontFamily: 'sans-serif', padding: '0 1.5rem', position: 'relative', overflowX: 'hidden' }}>
      
      {/* 🌟 สไตล์แอนิเมชันสำหรับดาวตกและการขยับต่างๆ พร้อมระบบมือถือ */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .terminal-cursor { display: inline-block; width: 8px; height: 18px; background-color: #34d399; margin-left: 5px; animation: blink 1s infinite; vertical-align: middle; }
        
        .project-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .project-card:hover { border-color: rgba(163, 230, 53, 0.4) !important; background: rgba(255,255,255,0.02) !important; transform: translateY(-5px); box-shadow: 0 10px 30px -15px rgba(16, 185, 129, 0.3); }
        .project-card button { transition: all 0.3s ease; }
        .project-card:hover button { background: linear-gradient(135deg, #a3e635, #10b981) !important; color: #000 !important; box-shadow: 0 0 15px rgba(52, 211, 153, 0.4); }

        @keyframes floatAnim { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(0.5deg); } }
        .floating-avatar { animation: floatAnim 5s infinite ease-in-out; }

        @keyframes shootAnim {
          0% { transform: rotate(135deg) translateX(-100px); opacity: 1; }
          100% { transform: rotate(135deg) translateX(2000px); opacity: 0; }
        }
        .shooting-star { position: absolute; width: 150px; height: 2px; background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1)); opacity: 0; }
        .shooting-star::after { content: ''; position: absolute; right: 0; top: -2px; width: 5px; height: 5px; background: #fff; border-radius: 50%; box-shadow: 0 0 15px 3px rgba(255,255,255,0.9); }
        .star-1 { top: -10%; right: 10%; animation: shootAnim 3.5s infinite linear 0.5s; }
        .star-2 { top: 20%; right: -10%; animation: shootAnim 4.2s infinite linear 2s; }
        .star-3 { top: -20%; right: 40%; animation: shootAnim 3s infinite linear 1s; }
        .star-4 { top: 40%; right: -20%; animation: shootAnim 5s infinite linear 3.5s; }
        .star-5 { top: 10%; right: 70%; animation: shootAnim 4s infinite linear 4s; }

        /* 📱 ระบบรองรับหน้าจอมือถือ (สำคัญมาก!) */
        @media (max-width: 960px) {
          .hero-container { grid-template-columns: 1fr !important; text-align: center; padding-top: 2rem !important; }
          .hero-title { font-size: 2.6rem !important; }
          .hero-left { order: 2; }
          .hero-right { order: 1; margin-bottom: 2rem; }
          .bento-grid-top { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .projects-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .about-card { flex-direction: column !important; text-align: center; padding: 2rem 1.5rem !important; }
          .profile-icon { margin: 0 auto !important; }
          .contact-list { grid-template-columns: 1fr !important; text-align: left; margin-top: 1.5rem; }
          .floating-avatar { width: 250px !important; height: 250px !important; margin: 0 auto; }
        }
      `}} />

      {/* 🌌 คอนเทนเนอร์แสดงดาวตกสีขาว */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="shooting-star star-1"></div>
        <div className="shooting-star star-2"></div>
        <div className="shooting-star star-3"></div>
        <div className="shooting-star star-4"></div>
        <div className="shooting-star star-5"></div>
      </div>

      {/* 📺 หน้าต่าง Pop-up สำหรับดูวิดีโอ (อัปเกรดเพื่อมือถือ) */}
      {selectedVideo && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} 
          onClick={() => setSelectedVideo(null)}
        >
          {/* แถบปุ่มด้านบนเครื่องเล่น */}
          <div style={{ width: '100%', maxWidth: '850px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }} onClick={(e) => e.stopPropagation()}>
            <a href={selectedVideo.link} target="_blank" rel="noreferrer" style={{ color: '#050806', textDecoration: 'none', background: '#34d399', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
              🔗 ดูวิดีโอแบบเต็มจอ
            </a>
            <button onClick={() => setSelectedVideo(null)} style={{ background: 'transparent', color: '#fff', border: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: '8px' }}>
              ✖ ปิด
            </button>
          </div>

          <div style={{ width: '100%', maxWidth: '850px', aspectRatio: '16/9', background: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(52, 211, 153, 0.3)', boxShadow: '0 0 50px rgba(16, 185, 129, 0.2)' }} onClick={(e) => e.stopPropagation()}>
            <iframe 
              width="100%" height="100%" 
              src={selectedVideo.link.replace('/view?usp=drive_link', '/preview')} 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen 
            />
          </div>
        </div>
      )}

      {/* หน้าจอโหลดรันโค้ด */}
      {isLoading && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#050806', color: '#34d399', fontFamily: 'monospace', padding: '4rem 2rem', zIndex: 9999, opacity: fadeLoading ? 0 : 1, transition: 'opacity 0.5s' }}>
          {terminalLines.map((line, i) => <div key={i}>{line}{i === terminalLines.length - 1 && <span className="terminal-cursor" />}</div>)}
        </div>
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0' }}>
          <div style={{ fontWeight: '900', fontSize: '1.4rem', color: '#34d399', letterSpacing: '1px' }}>JUKDUM.</div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
            <a href="#about" style={{ color: '#788b81', textDecoration: 'none' }}>เกี่ยวกับฉัน</a>
            <a href="#projects" style={{ color: '#788b81', textDecoration: 'none' }}>วิดีโอผลงาน</a>
          </div>
        </nav>

        <ScrollReveal>
          <header className="hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', alignItems: 'center', gap: '2rem', padding: '4rem 0 5rem' }}>
            <div className="hero-left">
              <h1 className="hero-title" style={{ fontSize: '3.6rem', fontWeight: '800', marginBottom: '1.5rem', color: '#fff', lineHeight: '1.15' }}>
                ชลสิทธิ์ เห็มวงศ์ <br/><span style={{ background: 'linear-gradient(to right, #34d399, #a3e635)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Content Creator & Sales</span>
              </h1>
              <p style={{ color: '#788b81', fontSize: '1.15rem', lineHeight: '1.6', maxWidth: '580px' }}>
                ชอบในการได้ลุยงานจริง ถ่ายคลิป ไลฟ์สด และตัดต่อวิดีโอ ประสบการณ์อาจจะยังไม่เยอะ แต่ผมพร้อมที่จะเรียนรู้สิ่งใหม่ๆ ตลอดเวลา และตื่นเต้นที่จะได้เปิดรับทุกโอกาสในการพัฒนาตัวเองครับ
              </p>
            </div>
            
            <div className="hero-right" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="floating-avatar" style={{ position: 'relative', width: '310px', height: '310px', borderRadius: '32px', padding: '6px', background: 'linear-gradient(135deg, #10b981, #a3e635)', boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.3)' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '26px', overflow: 'hidden', backgroundColor: '#050806' }}>
                  <img src={PROFILE_IMAGE_URL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </header>
        </ScrollReveal>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingBottom: '6rem' }}>
          
          <ScrollReveal>
            <div className="bento-grid-top" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem' }}>
              
              <section id="about" className="about-card" style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '2.5rem', border: '1px solid rgba(16, 185, 129, 0.1)', display: 'flex', gap: '2rem' }}>
                <div className="profile-icon" style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', flexShrink: 0 }}>🎙️</div>
                <div style={{ width: '100%' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>ประวัติการทำงานย่อ</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    {["เซลล์ขายโทรศัพท์", "สตาฟดูแลจัดสถานที่", "ผู้ช่วยมัคคุเทศก์", "งานไลฟ์สดสตรีมมิ่ง"].map((exp) => (
                      <span key={exp} style={{ background: 'rgba(255,255,255,0.03)', color: '#e5e7eb', padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.05)' }}>{exp}</span>
                    ))}
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '1.5rem 0' }} />
                  <div className="contact-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem', color: '#788b81' }}>
                    <div>📞 <strong>เบอร์โทร:</strong> <span style={{ color: '#fff' }}>0982478849</span></div>
                    <div>✉️ <strong>อีเมล:</strong> <span style={{ color: '#fff' }}>chonlasit2004@gmail.com</span></div>
                    <div>📍 <strong>พื้นที่รับงาน:</strong> <span style={{ color: '#fff' }}>นนทบุรี, กรุงเทพฯ</span></div>
                    <div>💬 <strong>Line ID:</strong> <span style={{ color: '#fff' }}>Conlasit2004</span></div>
                  </div>
                </div>
              </section>

              <section style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '2.5rem', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.2rem', color: '#fff' }}>ทักษะความสามารถ</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {skillsData.map((skill, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
                      <div>
                        <div style={{ color: '#a3e635', fontSize: '0.95rem', fontWeight: 'bold' }}>{skill.name}</div>
                        <div style={{ color: '#788b81', fontSize: '0.8rem', lineHeight: '1.4' }}>{skill.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </ScrollReveal>

          <ScrollReveal>
            <section style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '1.5rem 2rem' }}>
              <h4 style={{ fontSize: '1rem', color: '#788b81', marginBottom: '1rem' }}>🔗 ติดตามช่องทางโซเชียลมีเดียของฉัน</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <a href="https://www.instagram.com/jukdum5/" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.02)', padding: '0.6rem 1.2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>📸 Instagram</a>
                <a href="https://www.tiktok.com/@jukdum_" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.02)', padding: '0.6rem 1.2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>🎵 TikTok</a>
                <a href="https://www.facebook.com/bokuto.koutaro.921" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.02)', padding: '0.6rem 1.2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>👥 Facebook</a>
              </div>
            </section>
          </ScrollReveal>

          <section id="projects">
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', color: '#fff' }}>📁 คลังคลิปผลงานจริง ({projectData.length} วิดีโอ)</h3>
            
            <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {projectData.map((project) => (
                <div key={project.id} className="project-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
                  <div>
                    <span style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: 'bold', background: 'rgba(16, 185, 129, 0.05)', padding: '0.3rem 0.6rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>{project.category}</span>
                    <h4 style={{ color: '#fff', marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{project.title}</h4>
                    <p style={{ color: '#788b81', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>{project.desc}</p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedVideo(project)}
                    style={{ background: 'linear-gradient(135deg, #050806, #10b981)', color: '#34d399', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.8rem', borderRadius: '14px', width: '100%', border: '1px solid rgba(52, 211, 153, 0.3)', cursor: 'pointer' }}
                  >
                    ▶ เปิดดูคลิปผลงาน (กดเพื่อเล่นบนเว็บ)
                  </button>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}