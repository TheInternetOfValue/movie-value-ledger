"use client";

import React, { useEffect } from "react";

export function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    // @ts-ignore
    if (window.instgrm) {
      // @ts-ignore
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <div className="flex justify-center w-full min-h-[400px]">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px",
          maxWidth: "540px",
          minWidth: "326px",
          padding: "0",
          width: "99.375%",
        }}
      ></blockquote>
    </div>
  );
}

export function TwitterEmbed({ url }: { url: string }) {
  useEffect(() => {
    const checkAndLoad = () => {
      // @ts-ignore
      if (window.twttr && window.twttr.widgets) {
        // @ts-ignore
        window.twttr.widgets.load();
      }
    };
    
    // Initial check
    checkAndLoad();
    
    // Polling slightly for scripts that take time to initialize
    const timer = setTimeout(checkAndLoad, 1000);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="flex justify-center w-full min-h-[500px] py-4 bg-white/5 rounded-2xl">
      <blockquote className="twitter-tweet" data-theme="dark" data-align="center">
        <a href={url.replace('x.com', 'twitter.com')}></a>
      </blockquote>
    </div>
  );
}

export function SocialScripts() {
  useEffect(() => {
    // Only add scripts once
    if (!document.getElementById('instagram-embed-script')) {
      const s1 = document.createElement("script");
      s1.id = 'instagram-embed-script';
      s1.src = "//www.instagram.com/embed.js";
      s1.async = true;
      document.body.appendChild(s1);
    }

    if (!document.getElementById('twitter-embed-script')) {
      const s2 = document.createElement("script");
      s2.id = 'twitter-embed-script';
      s2.src = "https://platform.twitter.com/widgets.js";
      s2.async = true;
      document.body.appendChild(s2);
    }
  }, []);

  return null;
}
