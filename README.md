# hfxcreation<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HFX Creation — We Turn Raw Clips Into Scroll-Stopping Reels</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="htt...ap" rel="stylesheet">
<style>
  :root{
    --bg:#0a0a0b;
    --bg-alt:#121214;
    --card:#18181b;
    --card-2:#1e1e22;
    --line:#2a2a2e;
    --red:#ff1e34;
    --red-deep:#8c0000;
    --red-glow:rgba(255,30,52,.35);
    --white:#f3f3f1;
    --muted:#96969c;
    --font-display:'Bebas Neue', sans-serif;
    --font-body:'Space Grotesk', sans-serif;
    --font-mono:'JetBrains Mono', monospace;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{background:var(--bg);color:var(--white);font-family:var(--font-body);overflow-x:hidden;line-height:1.5;}
  ::selection{background:var(--red);color:#fff;}
  a{color:inherit;text-decoration:none;}
  img,video{max-width:100%;display:block;}
  button{font-family:inherit;cursor:pointer;border:none;background:none;}
  h1,h2,h3{font-family:var(--font-display);letter-spacing:.02em;text-transform:uppercase;}

  /* cursor dot */
  #cursorDot{position:fixed;top:0;left:0;width:22px;height:22px;border-radius:50%;background:var(--red);box-shadow:0 0 18px 4px var(--red-glow);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .2s,height .2s,opacity .2s;mix-blend-mode:screen;}
  #cursorDot.big{width:44px;height:44px;}
  #cursorDot.hide{opacity:0;}

  .container{max-width:1180px;margin:0 auto;padding:0 24px;}
  .eyebrow{font-family:var(--font-mono);font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--red);display:flex;align-items:center;gap:8px;margin-bottom:10px;}
  .eyebrow::before{content:'';width:8px;height:8px;background:var(--red);border-radius:50%;box-shadow:0 0 10px var(--red-glow);}

  /* reveal animation */
  .reveal{opacity:0;transform:translateY(36px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);}
  .reveal.in{opacity:1;transform:translateY(0);}
  .reveal-stagger > *{opacity:0;transform:translateY(30px);transition:opacity .6s ease,transform .6s ease;}
  .reveal-stagger.in > *{opacity:1;transform:translateY(0);}
  .reveal-stagger.in > *:nth-child(1){transition-delay:.05s;}
  .reveal-stagger.in > *:nth-child(2){transition-delay:.12s;}
  .reveal-stagger.in > *:nth-child(3){transition-delay:.19s;}
  .reveal-stagger.in > *:nth-child(4){transition-delay:.26s;}
  .reveal-stagger.in > *:nth-child(5){transition-delay:.33s;}
  .reveal-stagger.in > *:nth-child(6){transition-delay:.4s;}

  /* NAV */
  .nav{position:fixed;top:0;left:0;right:0;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:18px 28px;background:linear-gradient(180deg,rgba(10,10,11,.9),rgba(10,10,11,0));backdrop-filter:blur(6px);transition:background .3s;}
  .nav.scrolled{background:rgba(10,10,11,.92);border-bottom:1px solid var(--line);}
  .brand{font-family:var(--font-display);font-size:26px;letter-spacing:.06em;display:flex;align-items:center;gap:8px;}
  .brand span{color:var(--red);}
  .nav-links{display:flex;gap:28px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;}
  .nav-links a{opacity:.8;transition:opacity .2s,color .2s;position:relative;}
  .nav-links a::after{content:'';position:absolute;left:0;bottom:-4px;width:0;height:1px;background:var(--red);transition:width .25s;}
  .nav-links a:hover{opacity:1;color:var(--red);}
  .nav-links a:hover::after{width:100%;}
  .nav-cta{display:flex;align-items:center;gap:14px;}
  .btn{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;font-weight:600;border-radius:2px;}
  .btn-primary{background:var(--red);color:#fff;transition:transform .2s,box-shadow .2s;}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px var(--red-glow);}
  .btn-ghost{border:1px solid var(--line);color:var(--white);transition:border-color .2s,color .2s,transform .2s;}
  .btn-ghost:hover{border-color:var(--red);color:var(--red);transform:translateY(-2px);}
  .burger{display:none;flex-direction:column;gap:5px;}
  .burger span{width:24px;height:2px;background:var(--white);}

  /* HERO */
  .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:140px 0 80px;position:relative;overflow:hidden;}
  .hero-glow{position:absolute;inset:-20%;background:radial-gradient(circle at 22% 25%,rgba(255,30,52,.18),transparent 45%),radial-gradient(circle at 78% 75%,rgba(140,0,0,.16),transparent 45%);animation:driftGlow 14s ease-in-out infinite alternate;pointer-events:none;}
  @keyframes driftGlow{from{transform:translate(0,0) scale(1);}to{transform:translate(3%,-2%) scale(1.08);}}
  .hero::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:44px 44px;pointer-events:none;}
  .hero-inner{position:relative;z-index:2;}
  .rec-tag{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:12px;color:var(--muted);border:1px solid var(--line);padding:6px 12px;border-radius:20px;margin-bottom:24px;}
  .rec-dot{width:8px;height:8px;background:var(--red);border-radius:50%;animation:blink 1.4s infinite;}
  @keyframes blink{0%,100%{opacity:1;}50%{opacity:.2;}}
  .hero h1{font-size:clamp(48px,9vw,110px);line-height:.95;max-width:920px;}
  .hero h1 .line2{color:var(--red);-webkit-text-stroke:1px var(--red);display:inline-block;}
  .hero-sub{max-width:520px;color:var(--muted);font-size:17px;margin:26px 0 36px;}
  .hero-actions{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:70px;}
  .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:820px;border-top:1px solid var(--line);padding-top:28px;}
  .stat-num{font-family:var(--font-display);font-size:38px;color:var(--red);}
  .stat-label{font-family:var(--font-mono);font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;}

  /* MARQUEE */
  .marquee-wrap{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--bg-alt);overflow:hidden;padding:16px 0;}
  .marquee{display:flex;white-space:nowrap;animation:scroll 26s linear infinite;width:max-content;}
  .marquee span{font-family:var(--font-display);font-size:26px;letter-spacing:.03em;color:var(--muted);padding:0 20px;text-transform:uppercase;}
  .marquee span.accent{color:var(--red);}
  @keyframes scroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}

  /* SECTION */
  .section{padding:110px 0;}
  .section-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-bottom:48px;}
  .section-head h2{font-size:clamp(34px,5vw,56px);}
  .section-head p{color:var(--muted);max-width:420px;font-size:15px;}

  /* TOP CREATORS CAROUSEL */
  .creators-wrap{position:relative;}
  .creators-track{display:flex;gap:22px;overflow-x:auto;scroll-snap-type:x mandatory;padding:10px 4px 26px;scrollbar-width:none;}
  .creators-track::-webkit-scrollbar{display:none;}
  .creator-card{scroll-snap-align:start;flex:0 0 220px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:26px 20px;text-align:center;transition:transform .35s,border-color .35s;perspective:600px;}
  .creator-card:hover{border-color:var(--red);}
  .creator-avatar{width:96px;height:96px;border-radius:50%;margin:0 auto 16px;overflow:hidden;background:linear-gradient(160deg,var(--card-2),var(--bg));border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:26px;color:var(--muted);transition:border-color .3s;position:relative;}
  .creator-card:hover .creator-avatar{border-color:var(--red);}
  .creator-avatar img{width:100%;height:100%;object-fit:cover;}
  .creator-card h3{font-family:var(--font-body);font-weight:600;text-transform:none;letter-spacing:0;font-size:16px;}
  .creator-card .cat{color:var(--red);font-size:11px;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.05em;margin:4px 0 12px;}
  .creator-followers{font-family:var(--font-display);font-size:28px;line-height:1;}
  .creator-followers small{display:block;font-family:var(--font-mono);font-size:10px;color:var(--muted);text-transform:uppercase;margin-top:4px;letter-spacing:.05em;}
  .creator-years{font-size:11px;color:var(--muted);font-family:var(--font-mono);margin:10px 0 16px;}
  .creator-card .btn{width:100%;justify-content:center;padding:9px;font-size:11px;}
  .carousel-arrows{display:flex;gap:10px;justify-content:flex-end;margin-bottom:18px;}
  .arrow-btn{width:42px;height:42px;border-radius:50%;border:1px solid var(--line);color:var(--muted);font-size:16px;display:flex;align-items:center;justify-content:center;transition:border-color .2s,color .2s,transform .2s;}
  .arrow-btn:hover{border-color:var(--red);color:var(--red);transform:scale(1.08);}

  /* BEFORE AFTER */
  .ba-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:22px;}
  .ba-card{background:var(--card);border:1px solid var(--line);border-radius:8px;overflow:hidden;transition:transform .3s,border-color .3s;}
  .ba-card:hover{transform:translateY(-6px);border-color:var(--red);}
  .ba-media{aspect-ratio:4/5;position:relative;background:linear-gradient(160deg,var(--card-2),var(--bg));overflow:hidden;}
  .ba-media img,.ba-media video{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
  .ba-toggle{position:absolute;top:12px;left:12px;right:12px;display:flex;gap:6px;z-index:2;}
  .ba-toggle button{flex:1;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.05em;padding:7px 0;border-radius:20px;font-family:var(--font-mono);transition:background .2s,color .2s;}
  .ba-toggle button.active{background:var(--red);color:#fff;}
  .ba-placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--line);font-family:var(--font-mono);font-size:13px;text-align:center;padding:20px;}
  .ba-body{padding:16px 18px 20px;}
  .ba-body h3{font-family:var(--font-body);font-weight:600;text-transform:none;font-size:15px;letter-spacing:0;}
  .ba-body .handle{color:var(--red);font-size:12px;font-family:var(--font-mono);margin-bottom:8px;}
  .ba-body p{color:var(--muted);font-size:13px;margin-bottom:10px;}
  .ba-meta{display:flex;gap:14px;font-size:12px;color:var(--muted);font-family:var(--font-mono);flex-wrap:wrap;}
  .ba-meta b{color:var(--white);}

  /* REELS */
  .filter-tabs{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:32px;}
  .filter-tab{padding:9px 18px;border:1px solid var(--line);border-radius:20px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;font-family:var(--font-mono);color:var(--muted);transition:border-color .2s,color .2s,background .2s;}
  .filter-tab.active{background:var(--red);border-color:var(--red);color:#fff;}
  .filter-tab:hover{border-color:var(--red);color:var(--red);}
  .filter-tab.active:hover{color:#fff;}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:22px;}
  .card{background:var(--card);border:1px solid var(--line);border-radius:6px;overflow:hidden;position:relative;transition:transform .3s,border-color .3s,opacity .3s;}
  .card:hover{transform:translateY(-6px);border-color:var(--red);}
  .card-media{aspect-ratio:4/5;background:linear-gradient(160deg,var(--card-2),var(--bg));display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
  .card-media img{width:100%;height:100%;object-fit:cover;}
  .placeholder-icon{color:var(--line);font-size:14px;font-family:var(--font-mono);text-align:center;padding:10px;}
  .card-media .tag{position:absolute;top:12px;left:12px;background:var(--red);color:#fff;font-size:11px;padding:4px 10px;border-radius:20px;text-transform:uppercase;font-family:var(--font-mono);letter-spacing:.05em;z-index:2;}
  .card-body{padding:16px 18px 20px;}
  .card-body h3{font-family:var(--font-body);font-weight:600;font-size:17px;text-transform:none;letter-spacing:0;}
  .card-meta{display:flex;gap:14px;margin-top:12px;font-size:12px;color:var(--muted);font-family:var(--font-mono);}
  .card-meta b{color:var(--white);}
  .reel-card{cursor:pointer;}
  .reel-card .play-btn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.25);opacity:0;transition:opacity .25s;}
  .reel-card:hover .play-btn{opacity:1;}
  .play-circle{width:56px;height:56px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;box-shadow:0 0 24px var(--red-glow);transition:transform .3s;}
  .reel-card:hover .play-circle{transform:scale(1.1);}
  .play-circle::before{content:'';border-style:solid;border-width:9px 0 9px 15px;border-color:transparent transparent transparent #fff;margin-left:4px;}

  /* ABOUT */
  .about{display:grid;grid-template-columns:.8fr 1.2fr;gap:60px;align-items:center;}
  .about-photo{aspect-ratio:3/4;background:linear-gradient(160deg,var(--card-2),var(--bg));border:1px solid var(--line);border-radius:8px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;}
  .about-photo img{width:100%;height:100%;object-fit:cover;}
  .about-badge{position:absolute;bottom:16px;left:16px;background:var(--red);padding:10px 16px;font-family:var(--font-display);font-size:22px;line-height:1;border-radius:4px;}
  .about-badge small{display:block;font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.05em;margin-top:2px;}
  .about-text h2{font-size:clamp(30px,4vw,46px);margin-bottom:16px;}
  .about-text .role{color:var(--red);font-family:var(--font-mono);font-size:13px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:18px;display:block;}
  .about-text p{color:var(--muted);margin-bottom:26px;max-width:560px;}
  .skill-tags{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:30px;}
  .skill-tags span{border:1px solid var(--line);padding:7px 14px;border-radius:20px;font-size:12px;font-family:var(--font-mono);color:var(--muted);transition:border-color .2s,color .2s;}
  .skill-tags span:hover{border-color:var(--red);color:var(--red);}

  /* WHY */
  .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .why-card{background:var(--card);border:1px solid var(--line);padding:32px 26px;border-radius:6px;transition:border-color .3s,transform .3s;}
  .why-card:hover{border-color:var(--red);transform:translateY(-4px);}
  .why-num{font-family:var(--font-mono);color:var(--red);font-size:13px;margin-bottom:16px;}
  .why-icon{font-size:30px;margin-bottom:14px;}
  .why-card h3{font-family:var(--font-body);font-weight:600;text-transform:none;letter-spacing:0;font-size:18px;margin-bottom:10px;}
  .why-card p{color:var(--muted);font-size:14px;}

  /* FOOTER */
  .footer{background:var(--bg-alt);border-top:1px solid var(--line);padding:80px 0 30px;}
  .footer-top{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:50px;margin-bottom:60px;}
  .footer-brand .brand{margin-bottom:14px;}
  .footer-brand p{color:var(--muted);max-width:340px;font-size:14px;margin-bottom:20px;}
  .social-row{display:flex;gap:12px;}
  .social-row a{width:40px;height:40px;border:1px solid var(--line);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:border-color .2s,color .2s,transform .2s;}
  .social-row a:hover{border-color:var(--red);color:var(--red);transform:translateY(-3px);}
  .footer h4{font-family:var(--font-mono);font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:18px;}
  .footer ul{list-style:none;}
  .footer ul li{margin-bottom:12px;font-size:14px;}
  .footer ul li a{opacity:.85;transition:opacity .2s,color .2s;}
  .footer ul li a:hover{opacity:1;color:var(--red);}
  .footer-bottom{border-top:1px solid var(--line);padding-top:24px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:12px;color:var(--muted);}

  /* LIGHTBOX */
  .lightbox{position:fixed;inset:0;background:rgba(4,4,5,.92);z-index:2000;display:flex;align-items:center;justify-content:center;padding:24px;}
  .lightbox.hidden{display:none;}
  .lightbox-inner{width:100%;max-width:480px;background:#000;border-radius:8px;overflow:hidden;position:relative;border:1px solid var(--line);}
  .lightbox-inner video,.lightbox-inner img{width:100%;max-height:80vh;object-fit:contain;background:#000;}
  #lightboxClose{position:absolute;top:-42px;right:0;color:#fff;font-size:30px;line-height:1;}
  .lightbox-empty{padding:60px 30px;text-align:center;color:var(--muted);font-family:var(--font-mono);font-size:13px;}

  /* OWNER PANEL */
  .owner-btn{position:fixed;bottom:22px;right:22px;width:48px;height:48px;border-radius:50%;background:var(--card);border:1px solid var(--line);color:var(--muted);font-size:18px;z-index:1500;display:flex;align-items:center;justify-content:center;transition:border-color .2s,color .2s,transform .2s;}
  .owner-btn:hover{border-color:var(--red);color:var(--red);transform:rotate(45deg);}
  .owner-modal{position:fixed;inset:0;background:rgba(4,4,5,.94);z-index:3000;display:flex;align-items:center;justify-content:center;padding:20px;overflow-y:auto;}
  .owner-modal.hidden{display:none;}
  .owner-box{background:var(--card);border:1px solid var(--line);border-radius:10px;width:100%;max-width:560px;padding:36px;position:relative;max-height:88vh;overflow-y:auto;}
  .owner-box.wide{max-width:920px;}
  .owner-close{position:absolute;top:16px;right:20px;color:var(--muted);font-size:26px;}
  .owner-close:hover{color:var(--red);}
  .owner-box h2{font-size:26px;margin-bottom:6px;}
  .owner-box .sub{color:var(--muted);font-size:13px;margin-bottom:26px;font-family:var(--font-mono);}
  .field{margin-bottom:16px;}
  .field label{display:block;font-size:12px;font-family:var(--font-mono);color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;}
  .field input[type=text],.field input[type=password],.field input[type=email],.field textarea,.field select{width:100%;background:var(--bg);border:1px solid var(--line);color:var(--white);padding:11px 14px;border-radius:4px;font-family:var(--font-body);font-size:14px;}
  .field input:focus,.field textarea:focus,.field select:focus{outline:none;border-color:var(--red);}
  .field textarea{resize:vertical;min-height:70px;}
  .field input[type=file]{width:100%;color:var(--muted);font-size:13px;}
  .row-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .tabs{display:flex;gap:6px;margin-bottom:26px;flex-wrap:wrap;border-bottom:1px solid var(--line);}
  .tab-btn{color:var(--muted);padding:10px 14px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid transparent;}
  .tab-btn.active{color:var(--red);border-bottom-color:var(--red);}
  .tab-pane{display:none;}
  .tab-pane.active{display:block;}
  .mini-list{display:flex;flex-direction:column;gap:10px;margin-bottom:24px;}
  .mini-item{display:flex;align-items:center;gap:12px;background:var(--bg);border:1px solid var(--line);padding:10px 12px;border-radius:6px;}
  .mini-item .thumb{width:40px;height:40px;border-radius:50%;background:var(--card-2);flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--muted);}
  .mini-item .thumb img{width:100%;height:100%;object-fit:cover;}
  .mini-item .info{flex:1;min-width:0;}
  .mini-item .info b{display:block;font-size:13px;}
  .mini-item .info span{font-size:11px;color:var(--muted);font-family:var(--font-mono);}
  .mini-item .acts{display:flex;gap:6px;}
  .mini-item .acts button{color:var(--muted);font-size:12px;border:1px solid var(--line);padding:5px 10px;border-radius:4px;}
  .mini-item .acts button:hover{color:var(--red);border-color:var(--red);}
  .form-title{font-size:13px;font-family:var(--font-mono);text-transform:uppercase;color:var(--muted);margin:22px 0 14px;letter-spacing:.05em;}
  .error-msg{color:var(--red);font-size:13px;margin-top:10px;font-family:var(--font-mono);}
  .save-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--red);color:#fff;padding:12px 22px;border-radius:6px;font-size:13px;z-index:4000;opacity:0;transition:opacity .3s;pointer-events:none;}
  .save-toast.show{opacity:1;}

  @media(max-width:980px){
    .about{grid-template-columns:1fr;}
    .footer-top{grid-template-columns:1fr;gap:36px;}
    .why-grid{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:768px){
    .nav-links{position:fixed;top:64px;left:0;right:0;background:var(--bg);flex-direction:column;padding:24px 28px;border-bottom:1px solid var(--line);display:none;gap:18px;}
    .nav-links.open{display:flex;}
    .burger{display:flex;}
    .nav-cta .btn-ghost{display:none;}
    .stats-row{grid-template-columns:1fr 1fr;}
    .why-grid{grid-template-columns:1fr;}
    .row-2{grid-template-columns:1fr;}
    #cursorDot{display:none;}
  }
</style>
</head>
<body>

<div id="cursorDot"></div>

<!-- NAV -->
<header class="nav" id="siteNav">
  <a href="#home" class="brand">HFX <span>CREATION</span></a>
  <nav class="nav-links" id="navLinks">
    <a href="#creators">Creators</a>
    <a href="#beforeafter">Before &amp; After</a>
    <a href="#reels">Reels</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
  <div class="nav-cta">
    <a href="#" class="btn btn-ghost" id="waNavBtn">WhatsApp</a>
    <button class="burger" id="burgerBtn"><span></span><span></span><span></span></button>
  </div>
</header>

<!-- HERO -->
<section class="hero" id="home">
  <div class="hero-glow"></div>
  <div class="container hero-inner">
    <div class="rec-tag reveal"><span class="rec-dot"></span> <span id="heroLocation">Kolkata · Howrah</span></div>
    <h1 class="reveal" id="heroTitle">WE MAKE<br><span class="line2">REELS GO VIRAL</span></h1>
    <p class="hero-sub reveal" id="heroSubtitle">HFX Creation turns raw footage into cinematic, scroll-stopping reels — editing, ideation and motion graphics built for the algorithm.</p>
    <div class="hero-actions reveal">
      <a href="#" class="btn btn-primary" id="waHeroBtn">Work With Us →</a>
      <a href="#creators" class="btn btn-ghost">See Our Work ↓</a>
    </div>
    <div class="stats-row reveal-stagger" id="statsRow"></div>
  </div>
</section>

<div class="marquee-wrap">
  <div class="marquee" id="marqueeText"></div>
</div>

<!-- TOP CREATORS -->
<section class="section" id="creators">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="eyebrow">Our Family</div>
        <h2>Top Creators We've Worked With</h2>
      </div>
      <p>Sample profiles below — add your real creators from the Owner Panel.</p>
    </div>
    <div class="carousel-arrows reveal">
      <button class="arrow-btn" id="creatorPrev">←</button>
      <button class="arrow-btn" id="creatorNext">→</button>
    </div>
    <div class="creators-wrap reveal">
      <div class="creators-track" id="creatorsTrack"></div>
    </div>
  </div>
</section>

<!-- BEFORE AFTER -->
<section class="section" id="beforeafter" style="background:var(--bg-alt);">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="eyebrow">Transformations</div>
        <h2>Before &amp; After</h2>
      </div>
      <p>Raw footage meets cinematic craft — tap Raw / Edited to compare.</p>
    </div>
    <div class="ba-grid reveal-stagger" id="baGrid"></div>
  </div>
</section>

<!-- REELS -->
<section class="section" id="reels">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="eyebrow">Our Work</div>
        <h2>Best Performing Reels</h2>
      </div>
      <p>Click any card to play. Upload your own videos from the Owner Panel — they play right here on the site.</p>
    </div>
    <div class="filter-tabs reveal" id="filterTabs"></div>
    <div class="grid reveal-stagger" id="reelsGrid"></div>
  </div>
</section>

<!-- ABOUT -->
<section class="section" id="about">
  <div class="container about reveal">
    <div class="about-photo" id="aboutPhotoWrap">
      <div class="placeholder-icon">Founder Photo</div>
    </div>
    <div class="about-text">
      <div class="eyebrow">The Creator Behind HFX</div>
      <h2 id="aboutName">Harsh</h2>
      <span class="role" id="aboutRole">Founder · HFX Creation</span>
      <p id="aboutBio">I started HFX Creation because I believe great content deserves great editing — and one well-crafted reel can change a creator's entire trajectory.</p>
      <div class="skill-tags">
        <span>Video Editing</span><span>Motion Graphics</span><span>Graphic Design</span><span>Instagram Strategy</span><span>Script Writing</span>
      </div>
      <a href="#" class="btn btn-primary" id="waAboutBtn">Book a Call →</a>
    </div>
  </div>
</section>

<!-- WHY -->
<section class="section" style="padding-top:0;">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="eyebrow">Why HFX</div>
        <h2>What Makes Us Different</h2>
      </div>
    </div>
    <div class="why-grid reveal-stagger">
      <div class="why-card"><div class="why-num">01</div><div class="why-icon">🎬</div><h3>Cinematic Quality</h3><p>Every reel is treated like a film — colour, pacing and sound designed to hold attention.</p></div>
      <div class="why-card"><div class="why-num">02</div><div class="why-icon">🧠</div><h3>Smart Ideation</h3><p>We help you find hooks and angles that the algorithm rewards and audiences love.</p></div>
      <div class="why-card"><div class="why-num">03</div><div class="why-icon">🥷</div><h3>Native Feel</h3><p>Content that matches the platform's vibe perfectly — never feels like an ad.</p></div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer" id="contact">
  <div class="container">
    <div class="footer-top reveal-stagger">
      <div class="footer-brand">
        <a href="#home" class="brand">HFX <span>CREATION</span></a>
        <p>We make reels go viral. Cinematic editing, smart ideation and motion graphics for creators who want to grow.</p>
        <div class="social-row">
          <a href="#" id="igFooterBtn" title="Instagram">📷</a>
          <a href="#" id="waFooterBtn" title="WhatsApp">💬</a>
        </div>
      </div>
      <div>
        <h4>Navigate</h4>
        <ul>
          <li><a href="#creators">Creators</a></li>
          <li><a href="#beforeafter">Before &amp; After</a></li>
          <li><a href="#reels">Reels</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul id="contactList"></ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 HFX Creation — All rights reserved</span>
      <span>Built with HFX Owner Panel ⚙</span>
    </div>
  </div>
</footer>

<!-- LIGHTBOX -->
<div class="lightbox hidden" id="lightbox">
  <div class="lightbox-inner" id="lightboxInner">
    <button id="lightboxClose">&times;</button>
  </div>
</div>

<!-- OWNER PANEL BUTTON -->
<button class="owner-btn" id="ownerBtn" title="Owner Panel">⚙</button>

<!-- LOGIN MODAL -->
<div class="owner-modal hidden" id="loginModal">
  <div class="owner-box">
    <button class="owner-close" id="loginClose">&times;</button>
    <h2>Owner Panel</h2>
    <div class="sub">Login to edit your website content</div>
    <div class="field">
      <label>Password</label>
      <input type="password" id="ownerPassword" placeholder="Enter owner password">
    </div>
    <button class="btn btn-primary" id="loginSubmit" style="width:100%;justify-content:center;">Login</button>
    <div class="error-msg" id="loginError" style="display:none;">Wrong password. Try again.</div>
  </div>
</div>

<!-- DASHBOARD MODAL -->
<div class="owner-modal hidden" id="dashModal">
  <div class="owner-box wide">
    <button class="owner-close" id="dashClose">&times;</button>
    <h2>Owner Dashboard</h2>
    <div class="sub">Edit anything — changes save automatically to this website</div>
    <div class="tabs">
      <button class="tab-btn active" data-tab="tabSite">Site Info</button>
      <button class="tab-btn" data-tab="tabCreators">Creators</button>
      <button class="tab-btn" data-tab="tabBA">Before/After</button>
      <button class="tab-btn" data-tab="tabReels">Reels</button>
      <button class="tab-btn" data-tab="tabContact">Contact</button>
    </div>

    <!-- SITE INFO -->
    <div class="tab-pane active" id="tabSite">
      <div class="field"><label>Hero Title Line 1</label><input type="text" id="inHeroTitle1"></div>
      <div class="field"><label>Hero Title Line 2 (highlighted in red)</label><input type="text" id="inHeroTitle2"></div>
      <div class="field"><label>Hero Subtitle</label><textarea id="inHeroSub"></textarea></div>
      <div class="field"><label>Location Tag</label><input type="text" id="inHeroLocation"></div>
      <div class="form-title">Stats Bar</div>
      <div class="row-2">
        <div class="field"><label>Stat 1 Value</label><input type="text" id="stat0val"></div>
        <div class="field"><label>Stat 1 Label</label><input type="text" id="stat0lab"></div>
        <div class="field"><label>Stat 2 Value</label><input type="text" id="stat1val"></div>
        <div class="field"><label>Stat 2 Label</label><input type="text" id="stat1lab"></div>
        <div class="field"><label>Stat 3 Value</label><input type="text" id="stat2val"></div>
        <div class="field"><label>Stat 3 Label</label><input type="text" id="stat2lab"></div>
        <div class="field"><label>Stat 4 Value</label><input type="text" id="stat3val"></div>
        <div class="field"><label>Stat 4 Label</label><input type="text" id="stat3lab"></div>
      </div>
      <div class="form-title">About / Founder</div>
      <div class="row-2">
        <div class="field"><label>Founder Name</label><input type="text" id="inAboutName"></div>
        <div class="field"><label>Role Text</label><input type="text" id="inAboutRole"></div>
      </div>
      <div class="field"><label>Bio</label><textarea id="inAboutBio"></textarea></div>
      <div class="field"><label>Founder Photo</label><input type="file" accept="image/*" id="inAboutPhoto"></div>
      <button class="btn btn-primary" id="saveSiteBtn">Save Site Info</button>
    </div>

    <!-- CREATORS -->
    <div class="tab-pane" id="tabCreators">
      <div class="mini-list" id="creatorsList"></div>
      <div class="form-title" id="creatorFormTitle">Add New Creator Profile</div>
      <input type="hidden" id="cEditId">
      <div class="row-2">
        <div class="field"><label>Creator Name</label><input type="text" id="cName"></div>
        <div class="field"><label>Instagram Handle</label><input type="text" id="cHandle" placeholder="@handle"></div>
        <div class="field"><label>Category</label><input type="text" id="cCategory" placeholder="e.g. Lifestyle"></div>
        <div class="field"><label>Followers</label><input type="text" id="cFollowers" placeholder="e.g. 100K"></div>
        <div class="field"><label>Years Worked</label><input type="text" id="cYears" placeholder="e.g. 2 Years"></div>
      </div>
      <div class="field"><label>Profile Photo (circular)</label><input type="file" accept="image/*" id="cImage"></div>
      <div style="display:flex;gap:10px;">
        <button class="btn btn-primary" id="cSaveBtn">Add Creator</button>
        <button class="btn btn-ghost" id="cCancelBtn" style="display:none;">Cancel Edit</button>
      </div>
    </div>

    <!-- BEFORE AFTER -->
    <div class="tab-pane" id="tabBA">
      <div class="mini-list" id="baList"></div>
      <div class="form-title" id="baFormTitle">Add New Before/After</div>
      <input type="hidden" id="baEditId">
      <div class="row-2">
        <div class="field"><label>Creator Name</label><input type="text" id="baName"></div>
        <div class="field"><label>Instagram Handle</label><input type="text" id="baHandle" placeholder="@handle"></div>
        <div class="field"><label>Followers</label><input type="text" id="baFollowers"></div>
        <div class="field"><label>Result Tag</label><input type="text" id="baResultTag" placeholder="e.g. Emotional Reel"></div>
        <div class="field"><label>Views</label><input type="text" id="baViews"></div>
        <div class="field"><label>Likes</label><input type="text" id="baLikes"></div>
      </div>
      <div class="field"><label>Caption</label><textarea id="baCaption"></textarea></div>
      <div class="row-2">
        <div class="field"><label>Raw (Before) Image</label><input type="file" accept="image/*" id="baRawImage"></div>
        <div class="field"><label>Raw (Before) Video</label><input type="file" accept="video/*" id="baRawVideo"></div>
        <div class="field"><label>Edited (After) Image</label><input type="file" accept="image/*" id="baEditedImage"></div>
        <div class="field"><label>Edited (After) Video</label><input type="file" accept="video/*" id="baEditedVideo"></div>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn btn-primary" id="baSaveBtn">Add Card</button>
        <button class="btn btn-ghost" id="baCancelBtn" style="display:none;">Cancel Edit</button>
      </div>
    </div>

    <!-- REELS -->
    <div class="tab-pane" id="tabReels">
      <div class="mini-list" id="reelsList"></div>
      <div class="form-title" id="reelFormTitle">Add New Reel</div>
      <input type="hidden" id="rlEditId">
      <div class="row-2">
        <div class="field"><label>Reel Title / Caption</label><input type="text" id="rlTitle"></div>
        <div class="field"><label>Category Tag</label><input type="text" id="rlCategory" placeholder="e.g. Most Viral"></div>
        <div class="field"><label>Views</label><input type="text" id="rlViews" placeholder="e.g. 1.2M"></div>
        <div class="field"><label>Likes</label><input type="text" id="rlLikes" placeholder="e.g. 50K"></div>
      </div>
      <div class="field"><label>Thumbnail Image (optional)</label><input type="file" accept="image/*" id="rlImage"></div>
      <div class="field"><label>Video File (plays directly on your site)</label><input type="file" accept="video/*" id="rlVideo"></div>
      <div style="display:flex;gap:10px;">
        <button class="btn btn-primary" id="rlSaveBtn">Add Reel</button>
        <button class="btn btn-ghost" id="rlCancelBtn" style="display:none;">Cancel Edit</button>
      </div>
    </div>

    <!-- CONTACT -->
    <div class="tab-pane" id="tabContact">
      <div class="field"><label>Phone Number</label><input type="text" id="inPhone"></div>
      <div class="field"><label>Email</label><input type="email" id="inEmail"></div>
      <div class="field"><label>Instagram Handle</label><input type="text" id="inInstagram" placeholder="handle without @"></div>
      <div class="field"><label>Address</label><input type="text" id="inAddress"></div>
      <button class="btn btn-primary" id="saveContactBtn">Save Contact Info</button>
    </div>
  </div>
</div>

<div class="save-toast" id="saveToast">Saved ✓</div>

<script>
/* ================= DEFAULT DATA ================= */
const ADMIN_PASSWORD = "h4r...004";

const DEFAULTS = {
  hero:{title1:"WE MAKE",title2:"REELS GO VIRAL",subtitle:"HFX Creation turns raw footage into cinematic, scroll-stopping reels — editing, ideation and motion graphics built for the algorithm.",location:"Kolkata · Howrah"},
  stats:[{value:"10+",label:"Creators Served"},{value:"1M+",label:"Total Views"},{value:"100+",label:"Reels Edited"},{value:"1+",label:"Years Experience"}],
  about:{name:"Harsh",role:"Founder · HFX Creation",bio:"I started HFX Creation because I believe great content deserves great editing — and one well-crafted reel can change a creator's entire trajectory. From raw clips to cinematic, native-feeling reels — every project gets full attention to detail.",imageId:null},
  contact:{phone:"6206420964",email:"ozborn0101@gmail.com",instagram:"harshcore9",address:"Howrah, Kolkata, West Bengal"},
  creators:[
    {id:"c1",name:"Sample Creator One",handle:"@example_one",category:"Lifestyle",followers:"120K",years:"2 Years",imageId:null},
    {id:"c2",name:"Sample Creator Two",handle:"@example_two",category:"Fitness",followers:"85K",years:"1 Year",imageId:null},
    {id:"c3",name:"Sample Creator Three",handle:"@example_three",category:"Trading",followers:"200K",years:"2 Years",imageId:null},
    {id:"c4",name:"Sample Creator Four",handle:"@example_four",category:"Comedy",followers:"340K",years:"1 Year",imageId:null}
  ],
  beforeAfter:[
    {id:"b1",name:"Sample Creator",handle:"@example_one",followers:"120K",resultTag:"Emotional Reel",caption:"Sample caption — edit this from Owner Panel.",views:"500K",likes:"30K",rawImageId:null,rawVideoId:null,editedImageId:null,editedVideoId:null},
    {id:"b2",name:"Sample Brand",handle:"@example_brand",followers:"50K",resultTag:"Product Reel",caption:"Sample caption — edit this from Owner Panel.",views:"300K",likes:"12K",rawImageId:null,rawVideoId:null,editedImageId:null,editedVideoId:null}
  ],
  reels:[
    {id:"r1",title:"Sample Viral Reel — replace with your own",category:"Most Viral",views:"1.2M",likes:"60K",imageId:null,videoId:null},
    {id:"r2",title:"Sample Edited Reel",category:"Best Edited",views:"800K",likes:"40K",imageId:null,videoId:null},
    {id:"r3",title:"Sample Motion Graphics Reel",category:"Motion Graphics",views:"500K",likes:"20K",imageId:null,videoId:null},
    {id:"r4",title:"Sample Trend Reel",category:"Trend Reels",views:"300K",likes:"15K",imageId:null,videoId:null}
  ]
};

let siteData = loadSiteData();

function loadSiteData(){
  try{
    const raw = localStorage.getItem('hfxSiteDataV2');
    if(raw){
      const parsed = JSON.parse(raw);
      return Object.assign({}, JSON.parse(JSON.stringify(DEFAULTS)), parsed);
    }
  }catch(e){console.warn('load failed',e);}
  return JSON.parse(JSON.stringify(DEFAULTS));
}
function persist(){
  localStorage.setItem('hfxSiteDataV2', JSON.stringify(siteData));
  toast();
}
function toast(){
  const t = document.getElementById('saveToast');
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),1600);
}

/* ================= INDEXEDDB ================= */
let dbPromise = new Promise((resolve,reject)=>{
  const req = indexedDB.open('hfxMediaDBv2',1);
  req.onupgradeneeded = ()=> req.result.createObjectStore('media');
  req.onsuccess = ()=> resolve(req.result);
  req.onerror = ()=> reject(req.error);
});
async function idbSet(id, blob){
  const db = await dbPromise;
  return new Promise((res,rej)=>{
    const tx = db.transaction('media','readwrite');
    tx.objectStore('media').put(blob, id);
    tx.oncomplete = ()=>res(true);
    tx.onerror = ()=>rej(tx.error);
  });
}
async function idbGet(id){
  if(!id) return null;
  const db = await dbPromise;
  return new Promise((res)=>{
    const tx = db.transaction('media','readonly');
    const r = tx.objectStore('media').get(id);
    r.onsuccess = ()=>res(r.result || null);
    r.onerror = ()=>res(null);
  });
}
async function idbDelete(id){
  if(!id) return;
  const db = await dbPromise;
  const tx = db.transaction('media','readwrite');
  tx.objectStore('media').delete(id);
}
function newId(prefix){ return prefix+'_'+Date.now()+'_'+Math.floor(Math.random()*10000); }
 async function fileToObjectURL(id){
  if(typeof id === "string" && id.startsWith("http")){
    return id;
  }

  const blob = await idbGet(id);
  return blob ? URL.createObjectURL(blob) : null;
}

/* ================= RENDER ================= */
async function renderAll(){
  renderHero();
  renderMarquee();
  await renderCreators();
  await renderBeforeAfter();
  renderFilterTabs();
  await renderReelsGrid();
  await renderAbout();
  renderContact();
  initReveal();
}

function renderHero(){
  document.getElementById('heroTitle').innerHTML = escapeHtml(siteData.hero.title1) + '<br><span class="line2">' + escapeHtml(siteData.hero.title2) + '</span>';
  document.getElementById('heroSubtitle').textContent = siteData.hero.subtitle;
  document.getElementById('heroLocation').textContent = siteData.hero.location;
  const row = document.getElementById('statsRow');
  row.innerHTML = siteData.stats.map(s=>`<div><div class="stat-num" data-target="${escapeHtml(s.value)}">0</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`).join('');
}

function renderMarquee(){
  const words = ["Viral Reels","Motion Graphics","Instagram Native Editing","Social Media Strategy","Brand Storytelling","HFX Creation","Cinematic Editing","Smart Ideation"];
  let html = '';
  for(let r=0;r<2;r++){
    words.forEach((w,i)=>{ html += `<span class="${i%2===0?'accent':''}">${w} ✦</span>`; });
  }
  document.getElementById('marqueeText').innerHTML = html;
}

async function renderCreators(){
  const track = document.getElementById('creatorsTrack');
  track.innerHTML = '';
  for(const item of siteData.creators){
    const imgUrl = await fileToObjectURL(item.imageId);
    const igLink = `https://www.instagram.com/${(item.handle||'').replace('@','')}`;
    const el = document.createElement('div');
    el.className = 'creator-card';
    el.innerHTML = `
      <div class="creator-avatar">${imgUrl?`<img src="${imgUrl}">`:escapeHtml((item.name||'?').slice(0,2).toUpperCase())}</div>
      <h3>${escapeHtml(item.name)}</h3>
      <div class="cat">${escapeHtml(item.category||'')}</div>
      <div class="creator-followers">${escapeHtml(item.followers||'—')}<small>Followers</small></div>
      <div class="creator-years">${escapeHtml(item.years||'')}</div>
      <a href="${igLink}" target="_blank" class="btn btn-ghost">View Instagram</a>`;
    track.appendChild(el);
  }
  addTiltEffect(track.querySelectorAll('.creator-card'));
}
document.getElementById('creatorPrev').addEventListener('click', ()=>{
  document.getElementById('creatorsTrack').scrollBy({left:-240,behavior:'smooth'});
});
document.getElementById('creatorNext').addEventListener('click', ()=>{
  document.getElementById('creatorsTrack').scrollBy({left:240,behavior:'smooth'});
});

async function renderBeforeAfter(){
  const grid = document.getElementById('baGrid');
  grid.innerHTML = '';
  for(const item of siteData.beforeAfter){
    const el = document.createElement('div');
    el.className = 'ba-card';
    el.innerHTML = `
      <div class="ba-media" data-id="${item.id}">
        <div class="ba-toggle">
          <button class="ba-btn active" data-mode="raw">Raw</button>
          <button class="ba-btn" data-mode="edited">Edited</button>
        </div>
        <div class="ba-content"><div class="ba-placeholder">Loading…</div></div>
      </div>
      <div class="ba-body">
        <h3>${escapeHtml(item.name)}</h3>
        <div class="handle">${escapeHtml(item.handle||'')} · ${escapeHtml(item.followers||'')} Followers</div>
        ${item.resultTag?`<div class="handle" style="color:var(--muted);">🔥 ${escapeHtml(item.resultTag)}</div>`:''}
        <p>${escapeHtml(item.caption||'')}</p>
        <div class="ba-meta"><span><b>${escapeHtml(item.views||'0')}</b> Views</span><span><b>${escapeHtml(item.likes||'0')}</b> Likes</span></div>
      </div>`;
    grid.appendChild(el);
    await setBaMedia(el, item, 'raw');
    el.querySelectorAll('.ba-btn').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        el.querySelectorAll('.ba-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        await setBaMedia(el, item, btn.dataset.mode);
      });
    });
  }
}
async function setBaMedia(cardEl, item, mode){
  const content = cardEl.querySelector('.ba-content');
  const imgId = mode==='raw' ? item.rawImageId : item.editedImageId;
  const vidId = mode==='raw' ? item.rawVideoId : item.editedVideoId;
  if(vidId){
    const url = await fileToObjectURL(vidId);
    content.innerHTML = `<video src="${url}" muted loop autoplay playsinline></video>`;
  } else if(imgId){
    const url = await fileToObjectURL(imgId);
    content.innerHTML = `<img src="${url}">`;
  } else {
    content.innerHTML = `<div class="ba-placeholder">${mode==='raw'?'Raw':'Edited'} media not uploaded yet</div>`;
  }
}

function currentCategories(){
  const cats = new Set(siteData.reels.map(r=>r.category).filter(Boolean));
  return ['All', ...cats];
}
let activeFilter = 'All';
function renderFilterTabs(){
  const wrap = document.getElementById('filterTabs');
  wrap.innerHTML = currentCategories().map(c=>`<button class="filter-tab ${c===activeFilter?'active':''}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('');
  wrap.querySelectorAll('.filter-tab').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      activeFilter = btn.dataset.cat;
      wrap.querySelectorAll('.filter-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      await renderReelsGrid();
    });
  });
}

async function renderReelsGrid(){
  const grid = document.getElementById('reelsGrid');
  grid.innerHTML = '';
  const items = activeFilter==='All' ? siteData.reels : siteData.reels.filter(r=>r.category===activeFilter);
  for(const item of items){
    const imgUrl = await fileToObjectURL(item.imageId);
    const el = document.createElement('div');
    el.className = 'card reel-card';
    el.innerHTML = `
      <div class="card-media">
        <span class="tag">${escapeHtml(item.category||'Reel')}</span>
        ${imgUrl ? `<img src="${imgUrl}" alt="${escapeHtml(item.title)}">` : `<div class="placeholder-icon">${item.videoId? 'Video Added':'No Media Yet'}</div>`}
        <div class="play-btn"><div class="play-circle"></div></div>
      </div>
      <div class="card-body">
        <h3 style="font-size:15px;">${escapeHtml(item.title)}</h3>
        <div class="card-meta"><span><b>${escapeHtml(item.views||'0')}</b> Views</span><span><b>${escapeHtml(item.likes||'0')}</b> Likes</span></div>
      </div>`;
    el.addEventListener('click', ()=> openLightbox(item));
    grid.appendChild(el);
  }
  addTiltEffect(grid.querySelectorAll('.card'));
}

async function renderAbout(){
  document.getElementById('aboutName').textContent = siteData.about.name;
  document.getElementById('aboutRole').textContent = siteData.about.role;
  document.getElementById('aboutBio').textContent = siteData.about.bio;
  const wrap = document.getElementById('aboutPhotoWrap');
  const imgUrl = await fileToObjectURL(siteData.about.imageId);
  wrap.innerHTML = (imgUrl ? `<img src="${imgUrl}">` : `<div class="placeholder-icon">Founder Photo</div>`);
}

function renderContact(){
  const c = siteData.contact;
  const waLink = `https://wa.me/91${c.phone.replace(/\D/g,'')}`;
  const igLink = `https://www.instagram.com/${c.instagram.replace('@','')}`;
  document.getElementById('waNavBtn').href = waLink;
  document.getElementById('waHeroBtn').href = waLink;
  document.getElementById('waAboutBtn').href = waLink;
  document.getElementById('waFooterBtn').href = waLink;
  document.getElementById('igFooterBtn').href = igLink;
document.getElementById('contactList').innerHTML = `

    <li><a href="${waLink}">📱 ${escapeHtml(c.phone)}</a></li>
    <li><a href="mailto:${escapeHtml(c.email)}">✉️ ${escapeHtml(c.email)}</a></li>
    <li><a href="${igLink}">📷 @${escapeHtml(c.instagram.replace('@',''))}</a></li>
    <li>📍 ${escapeHtml(c.address)}</li>`;
}

function escapeHtml(str){
  if(str===undefined||str===null) return '';
  return String(str).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

/* ================= LIGHTBOX ================= */
async function openLightbox(item){
  const box = document.getElementById('lightbox');
  const inner = document.getElementById('lightboxInner');
  inner.innerHTML = '<button id="lightboxClose">&times;</button>';
  if(item.videoId){
    const url = await fileToObjectURL(item.videoId);
    const v = document.createElement('video');
    v.src = url; v.controls = true; v.autoplay = true; v.playsInline = true;
    inner.appendChild(v);
  } else if(item.imageId){
    const url = await fileToObjectURL(item.imageId);
    const img = document.createElement('img');
    img.src = url;
    inner.appendChild(img);
  } else {
    const p = document.createElement('div');
    p.className = 'lightbox-empty';
    p.textContent = 'No video uploaded yet for this reel. Add one from the Owner Panel.';
    inner.appendChild(p);
  }
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  box.classList.remove('hidden');
}
function closeLightbox(){
  const box = document.getElementById('lightbox');
  box.classList.add('hidden');
  const v = box.querySelector('video');
  if(v) v.pause();
}
document.getElementById('lightbox').addEventListener('click', e=>{
  if(e.target.id === 'lightbox') closeLightbox();
});

/* ================= NAV ================= */
window.addEventListener('scroll', ()=>{
  document.getElementById('siteNav').classList.toggle('scrolled', window.scrollY > 40);
});
document.getElementById('burgerBtn').addEventListener('click', ()=>{
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click', ()=>{
  document.getElementById('navLinks').classList.remove('open');
}));

/* ================= CURSOR: single red dot ================= */
(function cursorDot(){
  const dot = document.getElementById('cursorDot');
  if(!window.matchMedia('(pointer:fine)').matches){ dot.style.display='none'; return; }
  let mx=innerWidth/2, my=innerHeight/2, dx=mx, dy=my;
  window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
  window.addEventListener('mousedown', ()=>dot.classList.add('big'));
  window.addEventListener('mouseup', ()=>dot.classList.remove('big'));
  document.addEventListener('mouseleave', ()=>dot.classList.add('hide'));
  document.addEventListener('mouseenter', ()=>dot.classList.remove('hide'));
  function loop(){
    dx += (mx-dx)*0.18;
    dy += (my-dy)*0.18;
    dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();
  document.addEventListener('mouseover', e=>{
    if(e.target.closest('a,button,.card,.creator-card,.ba-card')) dot.classList.add('big');
    else dot.classList.remove('big');
  });
})();

/* ================= TILT EFFECT ================= */
function addTiltEffect(nodes){
  nodes.forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -8;
      const ry = ((x / r.width) - 0.5) * 8;
      card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
  });
}

/* ================= SCROLL REVEAL + COUNTERS ================= */
function initReveal(){
  const els = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        if(entry.target.id === 'statsRow') animateCounters();
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.2});
  els.forEach(el=>io.observe(el));
}
function animateCounters(){
  document.querySelectorAll('.stat-num').forEach(el=>{
    const target = el.dataset.target || '';
    const match = target.match(/([\d.]+)/);
    if(!match){ el.textContent = target; return; }
    const num = parseFloat(match[1]);
    const suffix = target.replace(match[1],'');
    let cur = 0;
    const steps = 40;
    const inc = num/steps;
    let i = 0;
    const timer = setInterval(()=>{
      i++; cur += inc;
      if(i>=steps){ cur = num; clearInterval(timer); }
      el.textContent = (Number.isInteger(num) ? Math.round(cur) : cur.toFixed(1)) + suffix;
    },30);
  });
}

/* ================= OWNER PANEL ================= */
const ownerBtn = document.getElementById('ownerBtn');
const loginModal = document.getElementById('loginModal');
const dashModal = document.getElementById('dashModal');

ownerBtn.addEventListener('click', ()=>{ loginModal.classList.remove('hidden'); });
document.getElementById('loginClose').addEventListener('click', ()=>loginModal.classList.add('hidden'));
document.getElementById('dashClose').addEventListener('click', ()=>dashModal.classList.add('hidden'));

document.getElementById('loginSubmit').addEventListener('click', ()=>{
  const val = document.getElementById('ownerPassword').value;
  if(val === ADMIN_PASSWORD){
    loginModal.classList.add('hidden');
    document.getElementById('ownerPassword').value='';
    document.getElementById('loginError').style.display='none';
    openDashboard();
  } else {
    document.getElementById('loginError').style.display='block';
  }
});

function openDashboard(){
  fillSiteForm();
  fillContactForm();
  renderAdminLists();
  dashModal.classList.remove('hidden');
}

document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

/* --- Site Info --- */
function fillSiteForm(){
  document.getElementById('inHeroTitle1').value = siteData.hero.title1;
  document.getElementById('inHeroTitle2').value = siteData.hero.title2;
  document.getElementById('inHeroSub').value = siteData.hero.subtitle;
  document.getElementById('inHeroLocation').value = siteData.hero.location;
  siteData.stats.forEach((s,i)=>{
    document.getElementById('stat'+i+'val').value = s.value;
    document.getElementById('stat'+i+'lab').value = s.label;
  });
  document.getElementById('inAboutName').value = siteData.about.name;
  document.getElementById('inAboutRole').value = siteData.about.role;
  document.getElementById('inAboutBio').value = siteData.about.bio;
}
document.getElementById('saveSiteBtn').addEventListener('click', async ()=>{
  siteData.hero.title1 = document.getElementById('inHeroTitle1').value.trim() || DEFAULTS.hero.title1;
  siteData.hero.title2 = document.getElementById('inHeroTitle2').value.trim() || DEFAULTS.hero.title2;
  siteData.hero.subtitle = document.getElementById('inHeroSub').value.trim();
  siteData.hero.location = document.getElementById('inHeroLocation').value.trim();
  siteData.stats.forEach((s,i)=>{
    s.value = document.getElementById('stat'+i+'val').value.trim();
    s.label = document.getElementById('stat'+i+'lab').value.trim();
  });
  siteData.about.name = document.getElementById('inAboutName').value.trim();
  siteData.about.role = document.getElementById('inAboutRole').value.trim();
  siteData.about.bio = document.getElementById('inAboutBio').value.trim();
  const photoFile = document.getElementById('inAboutPhoto').files[0];
  if(photoFile){ const id = newId('about_img'); await idbSet(id, photoFile); siteData.about.imageId = id; }
  persist();
  await renderAll();
});

/* --- Contact --- */
function fillContactForm(){
  document.getElementById('inPhone').value = siteData.contact.phone;
  document.getElementById('inEmail').value = siteData.contact.email;
  document.getElementById('inInstagram').value = siteData.contact.instagram;
  document.getElementById('inAddress').value = siteData.contact.address;
}
document.getElementById('saveContactBtn').addEventListener('click', ()=>{
  siteData.contact.phone = document.getElementById('inPhone').value.trim();
  siteData.contact.email = document.getElementById('inEmail').value.trim();
  siteData.contact.instagram = document.getElementById('inInstagram').value.trim();
  siteData.contact.address = document.getElementById('inAddress').value.trim();
  persist();
  renderContact();
});

/* --- Admin lists --- */
async function renderAdminLists(){
  const cList = document.getElementById('creatorsList');
  cList.innerHTML = '';
  for(const item of siteData.creators){
    const imgUrl = await fileToObjectURL(item.imageId);
    const row = document.createElement('div');
    row.className = 'mini-item';
    row.innerHTML = `<div class="thumb">${imgUrl?`<img src="${imgUrl}">`:'👤'}</div>
      <div class="info"><b>${escapeHtml(item.name)}</b><span>${escapeHtml(item.handle||'')} · ${escapeHtml(item.followers||'')}</span></div>
      <div class="acts"><button data-edit="${item.id}">Edit</button><button data-del="${item.id}">Delete</button></div>`;
    cList.appendChild(row);
  }
  cList.querySelectorAll('[data-edit]').forEach(b=>b.addEventListener('click', ()=>editCreator(b.dataset.edit)));
  cList.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click', ()=>deleteCreator(b.dataset.del)));

  const bList = document.getElementById('baList');
  bList.innerHTML = '';
  for(const item of siteData.beforeAfter){
    const row = document.createElement('div');
    row.className = 'mini-item';
    row.innerHTML = `<div class="thumb">🎞️</div>
      <div class="info"><b>${escapeHtml(item.name)}</b><span>${escapeHtml(item.resultTag||'')}</span></div>
      <div class="acts"><button data-edit="${item.id}">Edit</button><button data-del="${item.id}">Delete</button></div>`;
    bList.appendChild(row);
  }
  bList.querySelectorAll('[data-edit]').forEach(b=>b.addEventListener('click', ()=>editBA(b.dataset.edit)));
  bList.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click', ()=>deleteBA(b.dataset.del)));

  const rList = document.getElementById('reelsList');
  rList.innerHTML = '';
  for(const item of siteData.reels){
    const imgUrl = await fileToObjectURL(item.imageId);
    const row = document.createElement('div');
    row.className = 'mini-item';
    row.innerHTML = `<div class="thumb">${imgUrl?`<img src="${imgUrl}">`:'🎬'}</div>
      <div class="info"><b>${escapeHtml(item.title)}</b><span>${escapeHtml(item.category||'')} ${item.videoId?'· 🎥 video added':''}</span></div>
      <div class="acts"><button data-edit="${item.id}">Edit</button><button data-del="${item.id}">Delete</button></div>`;
    rList.appendChild(row);
  }
  rList.querySelectorAll('[data-edit]').forEach(b=>b.addEventListener('click', ()=>editReel(b.dataset.edit)));
  rList.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click', ()=>deleteReel(b.dataset.del)));
}

/* Creators CRUD */
function resetCreatorForm(){
  document.getElementById('cEditId').value='';
  ['cName','cHandle','cCategory','cFollowers','cYears'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('cImage').value='';
  document.getElementById('creatorFormTitle').textContent = 'Add New Creator Profile';
  document.getElementById('cSaveBtn').textContent = 'Add Creator';
  document.getElementById('cCancelBtn').style.display='none';
}
function editCreator(id){
  const item = siteData.creators.find(x=>x.id===id);
  if(!item) return;
  document.getElementById('cEditId').value = id;
  document.getElementById('cName').value = item.name;
  document.getElementById('cHandle').value = item.handle||'';
  document.getElementById('cCategory').value = item.category||'';
  document.getElementById('cFollowers').value = item.followers||'';
  document.getElementById('cYears').value = item.years||'';
  document.getElementById('creatorFormTitle').textContent = 'Edit Creator Profile';
  document.getElementById('cSaveBtn').textContent = 'Update Creator';
  document.getElementById('cCancelBtn').style.display='inline-flex';
}
async function deleteCreator(id){
  if(!confirm('Delete this creator?')) return;
  const item = siteData.creators.find(x=>x.id===id);
  if(item && item.imageId) await idbDelete(item.imageId);
  siteData.creators = siteData.creators.filter(x=>x.id!==id);
  persist();
  await renderAdminLists();
  await renderCreators();
}
document.getElementById('cCancelBtn').addEventListener('click', resetCreatorForm);
document.getElementById('cSaveBtn').addEventListener('click', async ()=>{
  const editId = document.getElementById('cEditId').value;
  const name = document.getElementById('cName').value.trim();
  if(!name){ alert('Naam daalna zaroori hai'); return; }
  let item;
  if(editId){ item = siteData.creators.find(x=>x.id===editId); }
  else { item = {id:newId('c'), imageId:null}; siteData.creators.push(item); }
  item.name = name;
  item.handle = document.getElementById('cHandle').value.trim();
  item.category = document.getElementById('cCategory').value.trim();
  item.followers = document.getElementById('cFollowers').value.trim();
  item.years = document.getElementById('cYears').value.trim();
  const file = document.getElementById('cImage').files[0];
  if(file){ const id = newId('c_img'); await idbSet(id, file); item.imageId = id; }
  persist();
  resetCreatorForm();
  await renderAdminLists();
  await renderCreators();
});

/* Before/After CRUD */
function resetBAForm(){
  document.getElementById('baEditId').value='';
  ['baName','baHandle','baFollowers','baResultTag','baViews','baLikes','baCaption'].forEach(id=>document.getElementById(id).value='');
  ['baRawImage','baRawVideo','baEditedImage','baEditedVideo'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('baFormTitle').textContent = 'Add New Before/After';
  document.getElementById('baSaveBtn').textContent = 'Add Card';
  document.getElementById('baCancelBtn').style.display='none';
}
function editBA(id){
  const item = siteData.beforeAfter.find(x=>x.id===id);
  if(!item) return;
  document.getElementById('baEditId').value = id;
  document.getElementById('baName').value = item.name;
  document.getElementById('baHandle').value = item.handle||'';
  document.getElementById('baFollowers').value = item.followers||'';
  document.getElementById('baResultTag').value = item.resultTag||'';
  document.getElementById('baViews').value = item.views||'';
  document.getElementById('baLikes').value = item.likes||'';
  document.getElementById('baCaption').value = item.caption||'';
  document.getElementById('baFormTitle').textContent = 'Edit Before/After';
  document.getElementById('baSaveBtn').textContent = 'Update Card';
  document.getElementById('baCancelBtn').style.display='inline-flex';
}
async function deleteBA(id){
  if(!confirm('Delete this card?')) return;
  const item = siteData.beforeAfter.find(x=>x.id===id);
  if(item){
    for(const k of ['rawImageId','rawVideoId','editedImageId','editedVideoId']) if(item[k]) await idbDelete(item[k]);
  }
  siteData.beforeAfter = siteData.beforeAfter.filter(x=>x.id!==id);
  persist();
  await renderAdminLists();
  await renderBeforeAfter();
}
document.getElementById('baCancelBtn').addEventListener('click', resetBAForm);
document.getElementById('baSaveBtn').addEventListener('click', async ()=>{
  const editId = document.getElementById('baEditId').value;
  const name = document.getElementById('baName').value.trim();
  if(!name){ alert('Naam daalna zaroori hai'); return; }
  let item;
  if(editId){ item = siteData.beforeAfter.find(x=>x.id===editId); }
  else { item = {id:newId('b'), rawImageId:null, rawVideoId:null, editedImageId:null, editedVideoId:null}; siteData.beforeAfter.push(item); }
  item.name = name;
  item.handle = document.getElementById('baHandle').value.trim();
  item.followers = document.getElementById('baFollowers').value.trim();
  item.resultTag = document.getElementById('baResultTag').value.trim();
  item.views = document.getElementById('baViews').value.trim();
  item.likes = document.getElementById('baLikes').value.trim();
  item.caption = document.getElementById('baCaption').value.trim();
  const map = {baRawImage:'rawImageId', baRawVideo:'rawVideoId', baEditedImage:'editedImageId', baEditedVideo:'editedVideoId'};
  for(const inputId in map){
    const f = document.getElementById(inputId).files[0];
    if(f){ const id = newId(inputId); await idbSet(id, f); item[map[inputId]] = id; }
  }
  persist();
  resetBAForm();
  await renderAdminLists();
  await renderBeforeAfter();
});

/* Reels CRUD */
function resetReelForm(){
  document.getElementById('rlEditId').value='';
  ['rlTitle','rlCategory','rlViews','rlLikes'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('rlImage').value='';
  document.getElementById('rlVideo').value='';
  document.getElementById('reelFormTitle').textContent = 'Add New Reel';
  document.getElementById('rlSaveBtn').textContent = 'Add Reel';
  document.getElementById('rlCancelBtn').style.display='none';
}
function editReel(id){
  const item = siteData.reels.find(x=>x.id===id);
  if(!item) return;
  document.getElementById('rlEditId').value = id;
  document.getElementById('rlTitle').value = item.title;
  document.getElementById('rlCategory').value = item.category||'';
  document.getElementById('rlViews').value = item.views||'';
  document.getElementById('rlLikes').value = item.likes||'';
  document.getElementById('reelFormTitle').textContent = 'Edit Reel';
  document.getElementById('rlSaveBtn').textContent = 'Update Reel';
  document.getElementById('rlCancelBtn').style.display='inline-flex';
}
async function deleteReel(id){
  if(!confirm('Delete this reel?')) return;
  const item = siteData.reels.find(x=>x.id===id);
  if(item){
    if(item.imageId) await idbDelete(item.imageId);
    if(item.videoId) await idbDelete(item.videoId);
  }
  siteData.reels = siteData.reels.filter(x=>x.id!==id);
  persist();
  await renderAdminLists();
  renderFilterTabs();
  await renderReelsGrid();
}
document.getElementById('rlCancelBtn').addEventListener('click', resetReelForm);
document.getElementById('rlSaveBtn').addEventListener('click', async ()=>{
  const editId = document.getElementById('rlEditId').value;
  const title = document.getElementById('rlTitle').value.trim();
  if(!title){ alert('Title daalna zaroori hai'); return; }
  let item;
  if(editId){ item = siteData.reels.find(x=>x.id===editId); }
  else { item = {id:newId('r'), imageId:null, videoId:null}; siteData.reels.push(item); }
  item.title = title;
  item.category = document.getElementById('rlCategory').value.trim();
  item.views = document.getElementById('rlViews').value.trim();
  item.likes = document.getElementById('rlLikes').value.trim();
  const imgFile = document.getElementById('rlImage').files[0];
  if(imgFile){ const id = newId('rl_img'); await idbSet(id, imgFile); item.imageId = id; }
  const vidFile = document.getElementById('rlVideo').files[0];
  if(vidFile){ const id = newId('rl_vid'); await idbSet(id, vidFile); item.videoId = id; }
  persist();
  resetReelForm();
  await renderAdminLists();
  renderFilterTabs();
  await renderReelsGrid();
});

/* ================= INIT ================= */
renderAll();
</script>
</body>
</html> 
