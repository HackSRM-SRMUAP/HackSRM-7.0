"use client";
import { useState, useEffect } from "react";

export default function HackSRMRecovery() {
  const [timeLeft, setTimeLeft] = useState(15 * 24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (24 * 3600));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d.toString().padStart(2, '0')}:${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-[#f0f0f0] text-black font-sans z-[9999] overflow-auto flex items-start md:items-center justify-center p-2 md:p-4 selection:bg-[#a00000] selection:text-white">
      <div className="w-full max-w-5xl bg-[#f0f0f0] border-2 border-white shadow-[4px_4px_15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden max-h-screen md:max-h-none">
        
        {/* Top Banner: Classic WannaCry Red */}
        <div className="bg-[#a00000] text-white p-3 md:p-4 flex items-center gap-3 md:gap-6 border-b-2 border-white">
           <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse">
             <div className="text-[#a00000] text-3xl md:text-5xl font-bold">!</div>
           </div>
           <div>
             <h1 className="text-lg md:text-3xl font-bold italic leading-tight">Ooops, your weekend has been encrypted!</h1>
           </div>
        </div>

        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
          {/* Sidebar: Urgency Indicators */}
          <div className="w-full md:w-80 bg-[#f0f0f0] border-b md:border-b-0 md:border-r border-gray-400 p-4 flex flex-col gap-4">
            <div className="border border-gray-400 p-3 bg-[#e4e4e4]">
              <h2 className="text-[#a00000] font-bold text-xs mb-2 text-center uppercase tracking-tighter">Hacking Phase initiates in</h2>
              {/* <p className="text-[10px] md:text-xs text-center font-bold mb-1">updated on 02/12/2026 00:00:00</p> */}
              <div className="bg-black text-[#00ff00] font-mono text-xl md:text-2xl py-1 text-center border-2 border-gray-500 shadow-inner">
                {formatTime(timeLeft)}
              </div>
            </div>
            
            

            <div className="border border-gray-400 p-3 bg-[#e4e4e4]">
              <h2 className="text-[#a00000] font-bold text-xs mb-2 text-center uppercase tracking-tighter">Registration closes in</h2>
              {/* <p className="text-[10px] md:text-xs text-center font-bold mb-1">02/16/2026 00:00:00</p> */}
              <div className="bg-black text-[#ff4d4d] font-mono text-xl md:text-2xl py-1 text-center border-2 border-gray-500 shadow-inner">
                {formatTime(timeLeft - 2 * 24 * 3600)}
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-2 mt-auto">
              <div className="text-xs font-bold text-blue-800 flex flex-col gap-1">
                <span onClick={() => {window.open("https://hack-srm26.devfolio.co","_blank","noopener,noreferrer")}} className="hover:underline cursor-pointer">{"|>"} About HackSRM 7.0</span>
                <span onClick={() => {window.open("https://maps.app.goo.gl/exbmhRb3zGrK8jFt5","_blank","noopener,noreferrer")}} className="hover:underline cursor-pointer">{"|>"} Venue Coordinates</span>
              </div>
              <div className="text-xs font-bold text-[#a00000] mt-2">
                <span>Support: hacksrm26@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Main Content Area: The Narrative */}
          <div className="flex-1 bg-white p-4 md:p-6 overflow-y-auto text-xs md:text-sm leading-relaxed font-serif">
            <section className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-[#a00000]">What Happened to My Weekend</h3>
              <p>Your mundane routine has been encrypted. We are injecting 24 hours of pure adrenaline, caffeine, and code into your system. Normal operations cannot resume until you build something legendary. While you’re looking for a shortcut, remember: great products aren't built on <strong>localhost</strong> alone.</p>
            </section>

            <section className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-[#a00000]">Can I Recover My Access?</h3>
              <p>Affirmative. Access is granted to all developers, designers, and visionaries. Whether you're a "Hello World" rookie or a kernel panic veteran, your stack is welcome here.</p>
              <p className="mt-2 font-bold bg-yellow-100 p-1 border-l-4 border-yellow-500">
                You can secure your spot for free. 
              </p>
              <p className="mt-2 italic">To unlock the full 24-hour experience, including mentors, food, swags and API credits, you must complete the registration before the timer hits zero.</p>
            </section>

            <section className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-[#a00000]">What is the Ransom?</h3>
              <p>We don't want your Bitcoin. We want your <strong>Commits</strong>. In exchange, we offer a massive prize pool, networking with industry leaders, and bragging rights that will last longer than your longest uptime. Failure to register will result in extreme FOMO.</p>
            </section>

            <div className="mt-4 md:mt-8 border-t pt-4">
               <label className="text-[10px] font-bold uppercase text-gray-500">Event Target Address:</label>
               <div className="bg-gray-100 p-2 border border-gray-400 font-mono break-all text-[10px] md:text-xs mt-1 select-all">
                 hack-srm26.devfolio.co
               </div>
               <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button onClick={() => {window.open("https://hack-srm26.devfolio.co/prizes","_blank","noopener,noreferrer")}} className="px-6 py-2 font-bold bg-[#e1e1e1] border-2 border-b-gray-600 border-r-gray-600 border-t-white border-l-white active:border-none shadow-sm text-xs uppercase tracking-widest">Check Prizes</button>
                  <button onClick={() => {window.open("https://hack-srm26.devfolio.co/","_blank","noopener,noreferrer")}} className="px-6 py-2 font-bold bg-[#e1e1e1] border-2 border-b-gray-600 border-r-gray-600 border-t-white border-l-white active:border-none shadow-sm text-xs uppercase tracking-widest text-[#a00000]">Register / Decrypt</button>
               </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f0f0f0] border-t border-gray-400 p-2 text-[9px] md:text-[10px] text-gray-600 flex justify-between items-center font-mono">
          <span>Status: <span className="text-green-600 animate-pulse">Awaiting Payload...</span></span>
          <span>v7.0.0-READY-TO-SHIP</span>
        </div>
      </div>

      <style jsx global>{`
        body {
          background-color: #333;
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
}