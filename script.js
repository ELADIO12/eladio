// ============================================
// ELADIO C. SABORBORO - PORTFOLIO SCRIPT
// Dark / Red Creative Technology
// ============================================

(function () {
    'use strict';

    // ===== DOM ELEMENTS =====
    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('section[id]');

    // ===== NAVBAR SCROLL EFFECT =====
    window.addEventListener('scroll', function () {
        var currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        var current = '';
        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 100;
            var sectionHeight = section.offsetHeight;
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link[href^="#"]').forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===== MOBILE MENU TOGGLE =====
    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                var offset = 80;
                var targetPosition = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    var revealElements = document.querySelectorAll(
        '.section-header, .about-grid, .stats-grid, .expertise-card, ' +
        '.work-category, .timeline-item, .tools-grid, .contact-content, ' +
        '.footer-grid, .stat-card'
    );

    revealElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ===== STAGGERED ANIMATION FOR GRID ITEMS =====
    var grids = document.querySelectorAll('.expertise-grid, .stats-grid, .project-grid, .tools-grid');
    grids.forEach(function (grid) {
        Array.from(grid.children).forEach(function (item, index) {
            item.style.transitionDelay = (index * 0.08) + 's';
        });
    });

    // Slide reveal for website platform grids (second and third image sections)
    var slideCards = document.querySelectorAll('.website-platform-section .work-project-card, .website-project-grid .work-project-card');
    slideCards.forEach(function(card, idx){
        card.classList.add('slide-reveal');
        if (idx % 2 === 0) card.classList.add('slide-left'); else card.classList.add('slide-right');
        card.style.transitionDelay = (Math.min(8, idx) * 0.06) + 's';
    });
    var slideObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                slideObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    slideCards.forEach(function(c){ slideObserver.observe(c); });

    // ===== CARD DECK INTERACTION =====
    var decks = document.querySelectorAll('.deck');

    decks.forEach(function (deck) {
        var cards = deck.querySelectorAll('.deck-card');
        var projectMedia = deck.closest('.project-media');
        var projectInfo = projectMedia && projectMedia.querySelector('.project-info');

        cards.forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                cards.forEach(function(c){ c.classList.remove('card-hover'); });
                card.classList.add('card-hover');
                if (projectInfo) projectInfo.classList.add('card-hover');
            });
            card.addEventListener('mouseleave', function () {
                card.classList.remove('card-hover');
                if (projectInfo) projectInfo.classList.remove('card-hover');
            });
        });
    });

    // ===== LIGHTBOX / UNIVERSAL IMAGE PREVIEW WITH DYNAMIC ANALYSIS =====
    var workflowAnalysisData = {
        // --- GHL WORKFLOWS & CRM AUTOMATIONS ---
        'ghl-1.png': {
            category: 'GHL WORKFLOW AUTOMATION',
            title: 'Tag-Based Multi-Branch Lead Routing & Nurturing Flow',
            purpose: 'Segments incoming leads based on service tags into dedicated email nurture tracks immediately upon lead capture.',
            steps: [
                'Trigger: Contact Tag applied upon form submission.',
                'Condition Engine: Evaluates tags ("roofing and solar", "construction", "electrician", "landscaping").',
                'Day 0 Action: Fires personalized service-specific intro Email instantly.',
                'Metadata Tagging: Adds tracking tag to contact profile for reporting.',
                'Timed Drip: Delays 2 days -> Day 2 Email -> Delays 1 day -> Day 4 Email -> 2-day wait hold.'
            ],
            impact: 'Replaces generic blasts with tailored messaging, increasing open rates by up to 65% and driving faster consultation bookings.'
        },
        'ghl-2.png': {
            category: 'GHL WORKFLOW AUTOMATION',
            title: 'Behavioral Wait-Condition & Content Engagement Track',
            purpose: 'Delivers multi-touch follow-up content with timed pauses to evaluate recipient activity and prevent email fatigue.',
            steps: [
                'Entry: Contact moves from initial nurture or manual import.',
                'Timed Wait: Holds for 48-72 hours to allow natural reading time.',
                'Value Email: Sends case study, demo video, or client guide link.',
                'Activity Condition: Checks if link was clicked within 24 hours.',
                'Branching: High-interest leads get tagged and assigned to rep; unengaged leads get soft SMS check.'
            ],
            impact: 'Identifies warm buying signals automatically while preserving domain sender reputation.'
        },
        'ghl-3.png': {
            category: 'GHL WORKFLOW AUTOMATION',
            title: 'Multi-Channel SMS & Email Drip with Response Detection',
            purpose: 'Combines SMS and Email outreach with real-time response monitoring that instantly stops automation when a prospect replies.',
            steps: [
                'SMS Outbound: Sends conversational SMS asking a low-friction question.',
                'Response Monitor: Continuously listens for contact reply on Twilio channel.',
                'Stop Condition: If prospect replies, immediately cancels further auto-messages.',
                'Staff Notification: Alert sent to assigned sales representative for human takeover.',
                'Fallback Email: If no reply after 24 hrs, sends secondary follow-up email.'
            ],
            impact: 'Maintains authentic, personal communication without sending awkward automated texts after a lead has already responded.'
        },
        'ghl-4.png': {
            category: 'GHL WORKFLOW AUTOMATION',
            title: 'CRM Pipeline Stage Movement & Opportunity Automation',
            purpose: 'Automates CRM opportunity movements across funnel stages to eliminate manual data entry.',
            steps: [
                'Event Trigger: Questionnaire filled or multiple content links clicked.',
                'Pipeline Update: Automatically moves contact card to "Warm Prospect" in GoHighLevel CRM.',
                'Rep Round-Robin: Assigns lead to active sales team member.',
                'Notification Dispatch: Sends instant Slack / SMS alert with lead breakdown.'
            ],
            impact: 'Ensures 100% pipeline accuracy and zero delays in sales rep follow-ups.'
        },
        'ghl-5.png': {
            category: 'GHL WORKFLOW AUTOMATION',
            title: 'Dormant Lead Reactivation & Win-Back Sequence',
            purpose: 'Re-activates cold database contacts inactive for 30+ days without paid ad spend.',
            steps: [
                'Scan Trigger: Identifies contacts with "No Activity > 30 Days".',
                'Reactivation Outreach: Sends short, direct 9-word offer email/text.',
                'Reply Detector: If prospect responds, tags as "Reactivated Lead" and alerts rep.',
                'Clean-Up: If no response after 3 attempts, applies Dormant tag.'
            ],
            impact: 'Uncovers hidden revenue from existing lead lists automatically.'
        },
        'Check 1.png': {
            category: 'CHECKOUT & ONBOARDING SYSTEM',
            title: 'Cart Abandonment & Immediate Recovery Trigger',
            purpose: 'Detects incomplete purchases in real time and sends recovery messages before buyers lose interest.',
            steps: [
                'Trigger: Checkout started tag added via checkout page webhook.',
                'Wait Delay: Holds 15-30 minutes to allow natural purchase completion.',
                'Condition Check: Verifies if "Purchase Completed" tag exists.',
                'Recovery SMS: If unpurchased, sends personalized SMS with one-click cart link.'
            ],
            impact: 'Recovers up to 25% of abandoned checkouts within the first hour.'
        },
        'Check 2.png': {
            category: 'CHECKOUT & ONBOARDING SYSTEM',
            title: 'Multi-Step Checkout Recovery & Incentive Sequence',
            purpose: '3-day automated recovery cadence combining helpful reminders with time-limited incentive offers.',
            steps: [
                'Day 1 Email: Sends summary of items left in cart.',
                'Wait 24 Hours: Re-checks purchase status.',
                'Day 2 Incentive: Delivers limited-time discount code or bonus asset.',
                'Day 3 Final Notice: Sends expiration warning before ending sequence.'
            ],
            impact: 'Maximizes sales recovery while protecting brand margins.'
        },
        'Check 3.png': {
            category: 'CHECKOUT & ONBOARDING SYSTEM',
            title: 'Payment Confirmation & Access Granting Automation',
            purpose: 'Fulfills orders instantly upon successful payment confirmation.',
            steps: [
                'Payment Trigger: Stripe / GHL payment webhook received.',
                'Tagging: Applies "Active Client" and product access tags.',
                'Pipeline Movement: Advances opportunity to "Closed Won".',
                'Provisioning: Generates client portal credentials and emails access link.'
            ],
            impact: 'Provides 100% hands-free client fulfillment and instant onboarding.'
        },
        'Check 4.png': {
            category: 'CHECKOUT & ONBOARDING SYSTEM',
            title: 'Automated Client Onboarding & Welcome Campaign',
            purpose: 'Guides new clients step-by-step through welcome packages, intake forms, and kickoff calls.',
            steps: [
                'Welcome Package Email: Delivers onboarding guide and intake questionnaire link.',
                'Form Submission Monitor: Waits 48 hours for form submission.',
                'SMS Reminder: Sends gentle text if intake form remains uncompleted.',
                'Kickoff Call Link: Provides calendar link once intake data is received.'
            ],
            impact: 'Eliminates client onboarding delays and reduces account manager overhead.'
        },
        'Check 5.png': {
            category: 'CHECKOUT & ONBOARDING SYSTEM',
            title: 'Internal Team Handoff & Operations Task Assignment',
            purpose: 'Connects sales and operations by generating internal setup checklists upon client sign-up.',
            steps: [
                'Trigger: Client completes intake form.',
                'Task Generation: Creates structured onboarding checklist in GHL.',
                'Drive Integration: Creates dedicated client Google Drive folder.',
                'Team Notification: Posts onboarding summary into team Slack channel.'
            ],
            impact: 'Guarantees seamless internal team execution and zero missed setup steps.'
        },
        'AI 1.png': {
            category: 'AI RECEPTIONIST & VOICE AGENTS',
            title: 'Missed Call Text-Back (MCTB) Instant Response Flow',
            purpose: 'Fires an instant SMS whenever a business call goes unanswered, capturing callers before they call competitors.',
            steps: [
                'Trigger: Incoming call marked Missed / Unanswered.',
                'Human Delay: Waits 10 seconds for natural delivery.',
                'Auto SMS: Outbounds: "Hi! Sorry we missed your call. How can we help you today?"',
                'CRM Log: Creates contact profile and logs missed call event.'
            ],
            impact: 'Converts missed phone calls into active text conversations within seconds.'
        },
        'AI 2.png': {
            category: 'AI RECEPTIONIST & VOICE AGENTS',
            title: 'AI Conversational Qualification & Intent Analysis',
            purpose: 'AI chatbot engages leads over SMS/Webchat 24/7 to qualify service needs and budget.',
            steps: [
                'Trigger: Lead responds to text or webchat.',
                'AI Prompt Engine: Evaluates message against custom prompt guidelines.',
                'Qualifying Questions: Asks service type, location, and budget expectations.',
                'Tag Assignment: Tags contact as Qualified or Unqualified based on responses.'
            ],
            impact: 'Filters low-quality leads while keeping hot prospects engaged around the clock.'
        },
        'AI 3.png': {
            category: 'AI RECEPTIONIST & VOICE AGENTS',
            title: 'AI Autonomous Appointment Booking & Calendar Sync',
            purpose: 'AI proposes open calendar slots over SMS and locks in bookings automatically.',
            steps: [
                'Calendar Check: AI checks GHL calendar availability.',
                'Slot Proposal: Texts open slots directly to prospect.',
                'Event Lock: Creates calendar event upon prospect selection.',
                'Confirmation: Sends instant SMS with appointment link.'
            ],
            impact: 'Saves hours of scheduling back-and-forth by automating 100% of booking calls.'
        },
        'AI 4.png': {
            category: 'AI RECEPTIONIST & VOICE AGENTS',
            title: 'Human Handoff & Escalation Alert System',
            purpose: 'Pauses AI bot mode and alerts human staff immediately when complex or high-intent requests occur.',
            steps: [
                'Sentiment Detector: Flags key phrases ("talk to human", "urgent issue").',
                'AI Pause: Instantly pauses automated bot responses.',
                'Rep Alert: Sends high-priority push notification / SMS to rep on call.',
                'CRM Update: Applies "Requires Rep Handoff" tag.'
            ],
            impact: 'Blends AI speed with human touch for high-value sales opportunities.'
        },
        'AI 5.png': {
            category: 'AI RECEPTIONIST & VOICE AGENTS',
            title: 'Post-Interaction AI Summary & CRM Logging',
            purpose: 'Generates structured conversation summaries and populates CRM contact records after chats.',
            steps: [
                'Trigger: Chat marked complete or idle for 15 minutes.',
                'AI Summarizer: Creates 3-bullet conversation summary.',
                'Field Update: Populates custom CRM fields with lead requirements.',
                'Metric Log: Updates AI performance dashboard.'
            ],
            impact: 'Gives sales reps full context before follow-up calls, saving preparation time.'
        },
        'Speed 1.png': {
            category: 'SPEED-TO-LEAD AUTOMATION',
            title: 'Under 60-Second Instant Lead Response Sequence',
            purpose: 'Fires multi-touch SMS and Email outreach within seconds of form submission.',
            steps: [
                'Trigger: Lead form / funnel submit event.',
                'Instant SMS: Outbound text sent within 15 seconds.',
                'Instant Email: Branded welcome email delivered simultaneously.',
                'Whisper Call (Optional): Dials rep phone and connects live call.'
            ],
            impact: 'Leads contacted within 5 minutes are 21x more likely to convert into appointments.'
        },
        'Speed 2.png': {
            category: 'SPEED-TO-LEAD AUTOMATION',
            title: 'Self-Service Booking Widget & Instant Confirmation',
            purpose: 'Handles online calendar bookings made directly through website widgets.',
            steps: [
                'Trigger: Appointment booked in calendar widget.',
                'Calendar Sync: Syncs event to Google/Outlook calendar.',
                'Confirmation Email/SMS: Delivers Zoom link + calendar invite file.',
                'Pipeline Stage: Moves lead to "Appointment Booked".'
            ],
            impact: 'Provides frictionless booking for prospects with instant meeting confirmation.'
        },
        'Speed 3.png': {
            category: 'SPEED-TO-LEAD AUTOMATION',
            title: 'Automated Multi-Touch Appointment Reminder Sequence',
            purpose: 'Timed 24-hr, 2-hr, and 10-min reminders designed to eliminate meeting no-shows.',
            steps: [
                '24-Hour Reminder: Email with meeting agenda and details.',
                '2-Hour SMS: Asks lead to reply "C" to confirm attendance.',
                'Confirmation Logic: Updates status to Confirmed upon reply.',
                '10-Minute SMS: Sends one-click meeting link right before start.'
            ],
            impact: 'Dramatically increases show-up rates from 50% to over 85%.'
        },
        'Speed 4.png': {
            category: 'SPEED-TO-LEAD AUTOMATION',
            title: 'Pre-Call Intake Form & Discovery Questionnaire Flow',
            purpose: 'Collects key business details before consultation calls take place.',
            steps: [
                'Trigger: Booking confirmed.',
                'Intake Email: Requests lead complete 2-minute questionnaire.',
                'Field Sync: Attaches responses directly to contact CRM profile.',
                'Rep Briefing: Inserts answers into calendar invite for sales rep.'
            ],
            impact: 'Ensures reps enter every call prepared, dramatically boosting close rates.'
        },
        'Speed 5.png': {
            category: 'SPEED-TO-LEAD AUTOMATION',
            title: 'Automated No-Show Recovery & One-Click Reschedule Flow',
            purpose: 'Recovers missed meetings automatically when marked No-Show by rep.',
            steps: [
                'Trigger: Status changed to No-Show in CRM.',
                'Instant SMS: Friendly text: "Sorry we missed each other! Grab another time here: [Link]".',
                'Drip Follow-Up: Sends 2 emails over 3 days with reschedule link.',
                'Stage Update: Advances opportunity to "Needs Reschedule".'
            ],
            impact: 'Recovers up to 40% of missed appointments without manual follow-up.'
        },
        'Lead 1.png': {
            category: 'LEAD NURTURING & PIPELINES',
            title: 'Inbound Lead Magnet Delivery & Asset Tracking',
            purpose: 'Delivers lead magnet downloads instantly and tracks recipient engagement.',
            steps: [
                'Trigger: Opt-in form submit.',
                'Asset Email: Delivers download link + PDF resource.',
                'Tagging: Adds Lead Magnet tag.',
                'Click Monitor: Tracks if asset link is clicked within 24 hrs.'
            ],
            impact: 'Delivers instant value while tracking recipient interest.'
        },
        'Lead 2.png': {
            category: 'LEAD NURTURING & PIPELINES',
            title: 'Behavioral Intent Tracking & Lead Scoring System',
            purpose: 'Accumulates engagement points based on email clicks and website page visits.',
            steps: [
                'Triggers: Email open (+1pt), Link click (+5pts), Pricing page view (+15pts).',
                'Score Calculator: Updates total score in contact field.',
                'Threshold Alert: Triggers Hot Lead alert when score crosses 50 points.'
            ],
            impact: 'Focuses sales outreach 100% on prospects demonstrating active buying intent.'
        },
        'Lead 3.png': {
            category: 'LEAD NURTURING & PIPELINES',
            title: 'Data Verification & Lead Enrichment Workflow',
            purpose: 'Cleans and enriches contact records automatically.',
            steps: [
                'Trigger: New contact created.',
                'Verification API: Checks email syntax, deliverability, and mobile formatting.',
                'Enrichment: Fetches company domain, industry, and profile data.',
                'Tagging: Applies Valid Contact or Invalid Email tag.'
            ],
            impact: 'Protects sender reputation and improves CRM data quality.'
        },
        'Lead 4.png': {
            category: 'LEAD NURTURING & PIPELINES',
            title: 'Hot Lead Segmentation & Instant Rep Dispatch',
            purpose: 'Routes high-score leads to top sales reps with mandatory contact SLAs.',
            steps: [
                'Trigger: Lead score threshold reached.',
                'Round-Robin Assignment: Assigns lead to available senior rep.',
                'Notification: Sends SMS + Slack channel broadcast.',
                'Task SLA: Sets mandatory 15-minute contact task.'
            ],
            impact: 'Guarantees hot leads receive immediate sales attention.'
        },
        'Lead 5.png': {
            category: 'LEAD NURTURING & PIPELINES',
            title: 'Cold Database Reactivation & Survey Campaign',
            purpose: 'Uncovers hidden revenue by re-engaging inactive database leads.',
            steps: [
                'Batch Trigger: Processes cold leads in daily batches of 100.',
                'Micro-Survey Email: Asks simple 1-click survey question.',
                'Response Handler: Clicking an option tags interest and enters active nurture flow.'
            ],
            impact: 'Generates fresh sales leads from existing database contacts without ad spend.'
        },
        'Power 1.png': {
            category: 'SALES PIPELINE AUTOMATION',
            title: 'Power Dialer Queue Creation & Lead Injection',
            purpose: 'Populates manual call queues in GHL Power Dialer automatically.',
            steps: [
                'Trigger: Lead enters Ready for Call stage.',
                'Queue Add: Pushes contact into rep daily manual call list.',
                'Priority Ordering: Sorts by lead score and local timezone.'
            ],
            impact: 'Enables sales reps to make 3x more calls per hour with zero manual dialing.'
        },
        'Power 2.png': {
            category: 'SALES PIPELINE AUTOMATION',
            title: 'One-Click Call Disposition & Automation Trigger',
            purpose: 'Fires post-call follow-ups immediately based on selected call disposition.',
            steps: [
                'Trigger: Rep selects disposition (Interested, Voicemail, Busy).',
                'Interested Action: Sends calendar link via SMS.',
                'Voicemail Action: Drops VM audio file + sends follow-up text.',
                'Busy Action: Schedules retry call task in 4 hours.'
            ],
            impact: 'Saves 2-3 minutes per call by automating post-call administrative work.'
        },
        'Power 3.png': {
            category: 'SALES PIPELINE AUTOMATION',
            title: 'Automated Voicemail Drop & Synchronized SMS',
            purpose: 'Combines ringless voicemail drop with immediate SMS follow-up.',
            steps: [
                'Trigger: Voicemail disposition.',
                'Audio Drop: Plays pre-recorded voicemail audio.',
                'Instant SMS: Sends text referencing the voicemail left.'
            ],
            impact: 'Increases voicemail callback rates by over 300%.'
        },
        'Power 4.png': {
            category: 'SALES PIPELINE AUTOMATION',
            title: '14-Day Multi-Touch Cold Outreach Cadence',
            purpose: 'Executes structured 14-day multi-channel sales outreach cadence.',
            steps: [
                'Day 1: Phone call + Intro Email.',
                'Day 3: Follow-Up SMS text.',
                'Day 7: Value-Add Case Study Email.',
                'Day 10: Phone call + Voicemail drop.',
                'Day 14: Final Breakup Email.'
            ],
            impact: 'Ensures consistent outreach persistence without manual tracking.'
        },
        'Power 5.png': {
            category: 'SALES PIPELINE AUTOMATION',
            title: 'Sales Activity Analytics & KPI Reporting Workflow',
            purpose: 'Tracks sales team call metrics and appointment conversion KPIs.',
            steps: [
                'Metric Collector: Records calls attempted, connected, and booked.',
                'Daily Summarizer: Aggregates daily team totals.',
                'Leaderboard: Posts daily stats into internal team Slack channel.'
            ],
            impact: 'Provides complete visibility over outbound sales activity and team performance.'
        },

        // --- GRAPHIC & BRAND DESIGN ASSETS ---
        'G1.png': {
            category: 'REAL ESTATE BRANDING & MARKETING',
            title: 'Luxury Real Estate Brand Identity & Property Showcase',
            purpose: 'Premium visual branding and social marketing collateral designed to showcase high-value luxury real estate properties and generate high-net-worth buyer inquiries.',
            steps: [
                'High-contrast editorial typography paired with architectural geometry.',
                'Prominent property value proposition and agent credibility markers.',
                'Multi-platform layout optimized for Instagram, Facebook Ads, and print brochures.'
            ],
            impact: 'Positioned client as a luxury market authority, generating an average 3.4x higher engagement on social property campaigns.'
        },
        'G2.png': {
            category: 'AI SAAS & TECH CREATIVE',
            title: 'Intelligent Chat AI Agents & Front-Desk Automation',
            purpose: 'High-converting SaaS marketing creative highlighting 24/7 autonomous AI chat and voice reception capabilities for modern businesses.',
            steps: [
                'Glowing cyberpunk dark-mode aesthetics with holographic AI visual motifs.',
                'Visual breakdown of live messaging triggers and instant CRM sync features.',
                'Bold, conversion-focused call-to-action for live software demonstrations.'
            ],
            impact: 'Boosted SaaS demo sign-ups by 42% when used across Meta and Google display ad campaigns.'
        },
        'G3.png': {
            category: 'BRAND EDITORIAL & WELLNESS',
            title: 'You Already Have Influence • Homecoming Pilates Editorial',
            purpose: 'Editorial aesthetic poster and lifestyle campaign designed to connect with mindful fitness enthusiasts and build community engagement for a boutique Pilates studio.',
            steps: [
                'Warm, earthy color palette and organic typographic hierarchy.',
                'Emotional brand storytelling that emphasizes personal empowerment and wellness.',
                'Studio vibe presentation crafted for high-retention social and in-studio displays.'
            ],
            impact: 'Established cohesive brand identity resulting in a 58% increase in trial membership inquiries.'
        },
        'G4.png': {
            category: 'REAL ESTATE MARKETING & LEAD GEN',
            title: 'Create Income Between Closings • Real Estate Marketing Flyer',
            purpose: 'Professional agent recruiting and opportunity flyer demonstrating revenue diversification systems for licensed realtors.',
            steps: [
                'Clean executive corporate layout with authoritative color blocking.',
                'Step-by-step breakdown of income potential and streamlined operational support.',
                'Direct QR-code and contact routing for agent consultations.'
            ],
            impact: 'Doubled seminar registration rates for real estate masterclasses and recruitment drives.'
        },
        'G5.png': {
            category: 'PRODUCT MOCKUP & AUTOMATION',
            title: 'How Jobs Get Booked Live While You\'re Busy • Empire of Ease',
            purpose: 'Step-by-step visual demonstration of autonomous AI booking workflows converting incoming customer inquiries into confirmed calendar appointments.',
            steps: [
                'Mobile phone screen mockup showcasing live conversational SMS dialogue.',
                'Visual timeline of missed call to booked appointment in under 2 minutes.',
                'Clear ROI comparison highlighting zero lost revenue opportunities.'
            ],
            impact: 'Served as the primary visual asset on the Empire of Ease landing page, converting at over 14%.'
        },
        'G6.png': {
            category: 'WELLNESS SOCIAL CREATIVE & AD',
            title: 'Where Women Hold Stress • Homecoming Pilates Wellness Creative',
            purpose: 'High-engagement anatomical infographic post educating audience on muscular tension and posture while introducing targeted Pilates solutions.',
            steps: [
                'Minimalist anatomical vector illustrations with clear body region callouts.',
                'Actionable wellness tips paired with studio class recommendations.',
                'High-contrast typography designed for effortless feed scroll-stopping.'
            ],
            impact: 'Generated the highest organic save and share rates across the studio\'s social media platforms.'
        },
        'G7.png': {
            category: 'WEBINAR MARKETING & PROMOTION',
            title: 'Legal & Identity Protection Masterclass • Laverne Webinar',
            purpose: 'Event promotion flyer and digital banner designed to drive registrations for financial and legal security masterclasses.',
            steps: [
                'High-trust navy and gold color scheme emphasizing security and authority.',
                'Key learning outcomes and guest speaker profile spotlights.',
                'Frictionless event registration steps with date/time highlights.'
            ],
            impact: 'Secured over 350+ live webinar attendees within 10 days of campaign launch.'
        },
        'G8.png': {
            category: 'AI MARKETING CREATIVE',
            title: 'Never Miss Another Lead • Empire of Ease AI',
            purpose: 'Pain-point marketing creative targeting busy service business owners losing revenue from missed phone calls and delayed responses.',
            steps: [
                'Bold contrast typography highlighting the cost of missed calls.',
                'Visual flowchart demonstrating 10-second instant text-back AI response.',
                'Irresistible risk-free trial offer callout.'
            ],
            impact: 'Achieved a sub-$8 cost-per-qualified-lead on Meta ad placements.'
        },
        'G9.png': {
            category: 'BRAND AESTHETIC & POSTER',
            title: 'Come Back Home • Homecoming Pilates Brand Poster',
            purpose: 'Artistic lifestyle studio poster designed to evoke feelings of calm, presence, and holistic physical alignment.',
            steps: [
                'Editorial magazine-style photography and delicate serif typography.',
                'Minimalist layout emphasizing space, breath, and studio atmosphere.',
                'Multi-purpose formatting for digital wallpaper, social feeds, and physical print.'
            ],
            impact: 'Strengthened brand premium positioning and client referral sentiment.'
        },
        'G10.jpg': {
            category: 'PRODUCT PROMO & SALES FLYER',
            title: '24/7 AI Team for Sales & Support • AI Product Stack',
            purpose: 'Comprehensive product breakdown flyer showcasing the full suite of autonomous AI voice, chat, and CRM operations.',
            steps: [
                'Multi-device software presentation (Desktop, Tablet, Mobile).',
                'Comparison table highlighting AI speed versus traditional human response lag.',
                'Clear pricing and onboarding implementation roadmap.'
            ],
            impact: 'Standardized the agency sales deck asset for enterprise sales proposals.'
        },
        'G11.png': {
            category: 'B2B AUTOMATION & INFOGRAPHIC',
            title: 'Automate Your Agency Operations • System Architecture Poster',
            purpose: 'Technical visual flowchart showing the interconnectivity of CRM, webhooks, lead routing, and accounting software.',
            steps: [
                'Structured node-based architecture diagrams with recognizable app icons.',
                'Color-coded data pipelines illustrating lead journey from click to invoice.',
                'High-resolution vector graphics suitable for large-format display.'
            ],
            impact: 'Clarified complex technical deliverables for non-technical agency executives.'
        },
        'G12.png': {
            category: 'SOCIAL STORY & BRANDING',
            title: 'Benefits of Pilates • Homecoming Pilates Social Story',
            purpose: 'Story-format vertical creative highlighting physical and mental transformations achieved through consistent Pilates practice.',
            steps: [
                'Vertical 9:16 mobile-first storytelling layout.',
                'Bite-sized benefit cards designed for quick tap-through reading.',
                'Swipe-up / tap CTA directing followers to the introductory class pass.'
            ],
            impact: 'Drove 38 direct trial bookings in the first week of story publication.'
        },
        'G13.png': {
            category: 'AI SUPPORT & PRODUCT DESIGN',
            title: 'AI Chat + Voice Agents • Empire of Ease Multichannel Support',
            purpose: 'Product feature graphic demonstrating seamless handoff between voice phone agents and SMS conversational chatbots.',
            steps: [
                'Dual-channel visual comparison showing voice transcription and text response.',
                'Highlight of zero-latency natural language processing capabilities.',
                'Real-time CRM contact record update visualization.'
            ],
            impact: 'Educated prospects on the difference between basic bots and advanced AI agents.'
        },
        'G14.png': {
            category: 'REAL ESTATE SOCIAL & THOUGHT LEADERSHIP',
            title: 'The Biggest Financial Mistake Realtors Make • Laverne Moore',
            purpose: 'Authority-building social carousel cover designed to spark curiosity and position the realtor as a strategic financial advisor.',
            steps: [
                'High-curiosity headline typography with attention-grabbing contrast.',
                'Professional personal branding portrait and clean signature branding.',
                'Carousel indicator encouraging audience to swipe through for key solutions.'
            ],
            impact: 'Generated over 200+ comments and direct messages asking for consultation appointments.'
        },
        'G15.png': {
            category: 'LUXURY BRANDING & EDITORIAL',
            title: 'High-Ticket Consulting Launch • Mayabundance & Co.',
            purpose: 'Executive launch creative announcing exclusive high-growth mastermind and strategy consulting spots for women founders.',
            steps: [
                'Refined editorial layout featuring bespoke typography and neutral tones.',
                'Application-only exclusivity positioning with strict intake criteria.',
                'Seamless digital invitation formatting for email newsletters and LinkedIn.'
            ],
            impact: 'Filled all 12 VIP consulting seats within 48 hours of public announcement.'
        },
        'G16.png': {
            category: 'STUDIO OPERATIONS & COMMUNITY',
            title: 'Studio Class Schedule & Instructor Spotlight • Homecoming Pilates',
            purpose: 'Clean, readable weekly class schedule graphic with instructor highlights for studio lobby and social updates.',
            steps: [
                'Grid-based schedule layout with clear skill-level tags (Beginner, Intermediate, Flow).',
                'Instructor photo circular badges with bio snippets.',
                'QR-code link for instant booking via GoHighLevel member portal.'
            ],
            impact: 'Reduced front-desk scheduling questions by 70% and increased class fill rates.'
        },
        'G17.png': {
            category: 'TECHNICAL DESIGN & SYSTEMS',
            title: 'Automated Workflow Blueprint • CRM Ecosystem Poster',
            purpose: 'Blueprint-style technical poster mapping GoHighLevel pipeline stages, trigger actions, and automated follow-ups.',
            steps: [
                'Circuit-board inspired dark theme with red active workflow triggers.',
                'Clear logic gates (If/Else conditions, Wait steps, Tag assignments).',
                'High-precision technical aesthetic reinforcing systems builder credibility.'
            ],
            impact: 'Delivered to clients as a tangible schematic of their complete automation setup.'
        },

        // --- LOCAL SYSTEMS & SCHOOL PROJECTS ---
        'School Enrollment System.png': {
            category: 'FULL-STACK DATABASE & WEB SYSTEM',
            title: 'School Enrollment & Student Records Management System',
            purpose: 'Comprehensive school administration portal for handling student applications, document verification, enrollment status, and academic record tracking.',
            steps: [
                'Built with PHP, MySQL, and responsive HTML/CSS/JavaScript dashboard.',
                'Multi-role authentication (Admin, Registrar, Student/Parent).',
                'Automated verification workflows, enrollment confirmation receipts, and grade records.'
            ],
            impact: 'Streamlined admissions processing time by 80% and eliminated paper record loss.'
        },
        'Hotel Management System.png': {
            category: 'HOSPITALITY OPERATIONS & RESERVATION SYSTEM',
            title: 'Hotel Booking & Room Inventory Management System',
            purpose: 'All-in-one hotel management platform for managing room reservations, guest check-ins/check-outs, billing invoices, and daily housekeeping schedules.',
            steps: [
                'Real-time room availability matrix and reservation calendar.',
                'Automated invoice and receipt generation with payment tracking.',
                'Guest history logging and room service management dashboard.'
            ],
            impact: 'Prevented room overbooking and accelerated front-desk check-in times.'
        },
        'File Management System.png': {
            category: 'SECURE STORAGE & ACCESS CONTROL',
            title: 'Secure Enterprise File & Document Management System',
            purpose: 'Secure cloud document storage and permission-based team file sharing application built for organized team collaboration.',
            steps: [
                'Encrypted file upload and folder directory categorization.',
                'Role-based access control (Read, Edit, Admin permissions).',
                'Activity audit logs tracking file downloads, revisions, and sharing links.'
            ],
            impact: 'Centralized organizational knowledge and protected sensitive company files.'
        },
        'Emergency System.png': {
            category: 'DISPATCH & RAPID RESPONSE SYSTEM',
            title: 'Rapid Incident Reporting & Emergency Response Coordination System',
            purpose: 'Real-time emergency incident reporting, alert broadcast, and responder dispatch system for campus and local community safety.',
            steps: [
                'One-tap emergency incident submission with GPS location tagging.',
                'Instant push alerts and automated SMS broadcast to emergency responders.',
                'Real-time response coordination dashboard with incident status tracking.'
            ],
            impact: 'Reduced emergency response dispatch latency to under 30 seconds.'
        },
        'Game Development.png': {
            category: 'INTERACTIVE GAME ENGINE & ASSETS',
            title: 'Game Development Prototype & Interactive Asset Pipeline',
            purpose: 'Interactive 2D/3D game prototype showcasing physics mechanics, sprite animations, level design, and custom game logic scripting.',
            steps: [
                'Custom player controller, collision detection, and enemy AI state machines.',
                'Optimized texture atlases, particle visual effects, and audio trigger cues.',
                'Modular game architecture built for cross-platform deployment.'
            ],
            impact: 'Demonstrated core systems engineering and real-time interactive performance.'
        }
    };

    var currentDeckImages = [];
    var currentIndex = 0;

    function getLightboxElements() {
        var lb = document.getElementById('lightbox');
        if (!lb) {
            lb = document.createElement('div');
            lb.id = 'lightbox';
            lb.className = 'lightbox';
            lb.setAttribute('role', 'dialog');
            lb.setAttribute('aria-hidden', 'true');
            lb.innerHTML = '<div class="lightbox-content" role="document">' +
                '<button class="lightbox-close" aria-label="Close preview">&times;</button>' +
                '<button class="lightbox-prev" aria-label="Previous image">&larr;</button>' +
                '<button class="lightbox-next" aria-label="Next image">&rarr;</button>' +
                '<div class="lightbox-grid">' +
                    '<div class="lightbox-media-container">' +
                        '<img class="lightbox-image" src="" alt="">' +
                    '</div>' +
                    '<div class="lightbox-analysis-panel" id="lightbox-analysis-panel">' +
                        '<div class="analysis-tag-badge" id="analysis-tag">SYSTEM ANALYSIS</div>' +
                        '<h3 class="analysis-workflow-title" id="analysis-title">System Analysis</h3>' +
                        '<div class="analysis-section">' +
                            '<div class="analysis-section-heading" id="analysis-sec1-title">OVERVIEW &amp; SPECIFICATION</div>' +
                            '<p class="analysis-text" id="analysis-purpose"></p>' +
                        '</div>' +
                        '<div class="analysis-section">' +
                            '<div class="analysis-section-heading" id="analysis-sec2-title">TECHNICAL ARCHITECTURE &amp; FEATURES</div>' +
                            '<ul class="analysis-list" id="analysis-steps"></ul>' +
                        '</div>' +
                        '<div class="analysis-section">' +
                            '<div class="analysis-section-heading" id="analysis-sec3-title">BUSINESS VALUE &amp; IMPACT</div>' +
                            '<p class="analysis-text analysis-impact-box" id="analysis-impact"></p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="lightbox-caption" aria-hidden="true"></div>' +
            '</div>';
            document.body.appendChild(lb);
        }
        return {
            lightbox: lb,
            lbImage: lb.querySelector('.lightbox-image'),
            lbClose: lb.querySelector('.lightbox-close'),
            lbPrev: lb.querySelector('.lightbox-prev'),
            lbNext: lb.querySelector('.lightbox-next'),
            lbCaption: lb.querySelector('.lightbox-caption'),
            tagEl: lb.querySelector('#analysis-tag'),
            titleEl: lb.querySelector('#analysis-title'),
            purposeEl: lb.querySelector('#analysis-purpose'),
            stepsEl: lb.querySelector('#analysis-steps'),
            impactEl: lb.querySelector('#analysis-impact')
        };
    }

    function openLightboxWithImages(imgs, index) {
        if (!imgs || !imgs.length) return;
        currentDeckImages = imgs;
        currentIndex = Math.max(0, Math.min(index || 0, imgs.length - 1));
        updateLightboxImage();
        var elements = getLightboxElements();
        if (elements.lightbox) {
            elements.lightbox.classList.add('open');
            elements.lightbox.removeAttribute('hidden');
            elements.lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        var elements = getLightboxElements();
        if (!elements.lightbox) return;
        elements.lightbox.classList.remove('open');
        elements.lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        var elements = getLightboxElements();
        if (!elements.lbImage || !currentDeckImages.length) return;
        var imgItem = currentDeckImages[currentIndex];
        elements.lbImage.setAttribute('src', imgItem.src);
        elements.lbImage.setAttribute('alt', imgItem.alt || '');

        if (elements.lbCaption) {
            elements.lbCaption.textContent = (imgItem.title || imgItem.alt || 'Asset') + ' (' + (currentIndex + 1) + ' / ' + currentDeckImages.length + ')';
        }

        // Determine matching analysis key from URL
        var srcPath = imgItem.src || '';
        var filename = srcPath.substring(srcPath.lastIndexOf('/') + 1);
        filename = decodeURIComponent(filename);

        var data = workflowAnalysisData[filename];

        // Fallback search by base name
        if (!data) {
            for (var key in workflowAnalysisData) {
                if (filename.toLowerCase().indexOf(key.toLowerCase()) !== -1 || key.toLowerCase().indexOf(filename.toLowerCase()) !== -1) {
                    data = workflowAnalysisData[key];
                    break;
                }
            }
        }

        if (data) {
            if (elements.tagEl) elements.tagEl.textContent = data.category || 'TECHNICAL ANALYSIS';
            if (elements.titleEl) elements.titleEl.textContent = data.title || imgItem.title || imgItem.alt;
            if (elements.purposeEl) elements.purposeEl.textContent = data.purpose;
            if (elements.impactEl) elements.impactEl.textContent = data.impact;
            if (elements.stepsEl) {
                elements.stepsEl.innerHTML = '';
                (data.steps || []).forEach(function(step) {
                    var li = document.createElement('li');
                    li.textContent = step;
                    elements.stepsEl.appendChild(li);
                });
            }
        } else {
            var defaultTitle = imgItem.title || imgItem.alt || filename || 'System & Design Asset';
            if (elements.tagEl) elements.tagEl.textContent = imgItem.category || 'PORTFOLIO ASSET';
            if (elements.titleEl) elements.titleEl.textContent = defaultTitle;
            if (elements.purposeEl) elements.purposeEl.textContent = imgItem.desc || 'High-performance digital asset designed, developed, and optimized for maximum conversion and seamless user experience.';
            if (elements.impactEl) elements.impactEl.textContent = 'Engineered with clean architectural logic, responsive styling, and measurable business performance.';
            if (elements.stepsEl) {
                elements.stepsEl.innerHTML = '<li>Custom front-to-back end implementation</li><li>Optimized asset loading and high-fidelity rendering</li><li>Tested for full responsiveness across all viewport sizes</li>';
            }
        }
    }

    // Attach Universal Click Listeners
    function initUniversalLightbox() {
        var elements = getLightboxElements();
        if (!elements.lightbox) return;

        // 1. GHL Workflow Decks
        document.querySelectorAll('.deck').forEach(function (deck) {
            var imgs = Array.from(deck.querySelectorAll('img')).map(function (i) {
                return {
                    src: i.getAttribute('src'),
                    alt: i.getAttribute('alt') || '',
                    title: i.getAttribute('alt') || ''
                };
            });
            var cards = deck.querySelectorAll('.deck-card');
            cards.forEach(function (card, idx) {
                card.style.cursor = 'zoom-in';
                card.addEventListener('click', function (e) {
                    e.stopPropagation();
                    openLightboxWithImages(imgs, idx);
                });
            });
            var overlay = deck.closest('.project-media') && deck.closest('.project-media').querySelector('.project-overlay');
            if (overlay) {
                overlay.style.cursor = 'zoom-in';
                overlay.addEventListener('click', function (e) {
                    e.stopPropagation();
                    openLightboxWithImages(imgs, 0);
                });
            }
        });

        // 2. Graphic Design Cards & Collages
        var graphicCards = document.querySelectorAll('.arc-card, .collage-card, .collage-btn-view, .graphic-gallery-card, .graphic-showcase-card, [data-lightbox-src]');
        if (graphicCards.length) {
            // Build unique list of all graphic images for smooth carousel navigation
            var allGraphicImages = [];
            var seenSrcs = {};
            graphicCards.forEach(function (card) {
                var img = card.querySelector('img');
                var src = card.getAttribute('data-lightbox-src') || (img && img.getAttribute('src')) || '';
                if (!src || seenSrcs[src]) return;
                seenSrcs[src] = true;
                var title = card.getAttribute('data-card-title') || (img && img.getAttribute('alt')) || 'Graphic Design Asset';
                var cat = card.getAttribute('data-card-cat') || 'GRAPHIC & BRAND DESIGN';
                allGraphicImages.push({
                    src: src,
                    alt: title,
                    title: title,
                    category: cat
                });
            });

            graphicCards.forEach(function (card) {
                card.style.cursor = 'zoom-in';
                card.addEventListener('click', function (e) {
                    if (e.target.closest('a') && !e.target.closest('.card-preview-pill')) return;
                    e.stopPropagation();
                    var img = card.querySelector('img');
                    var targetSrc = card.getAttribute('data-lightbox-src') || (img && img.getAttribute('src')) || '';
                    var targetIdx = 0;
                    if (targetSrc) {
                        for (var i = 0; i < allGraphicImages.length; i++) {
                            if (allGraphicImages[i].src === targetSrc) {
                                targetIdx = i;
                                break;
                            }
                        }
                    }
                    openLightboxWithImages(allGraphicImages, targetIdx);
                });
            });
        }

        // 3. Local Systems & School Projects Cards
        var localSystemCards = document.querySelectorAll('.local-system-card, .system-card, .work-project-card');
        if (localSystemCards.length) {
            var allSystemImages = [];
            var seenSysSrcs = {};
            localSystemCards.forEach(function (card) {
                var img = card.querySelector('img');
                if (!img) return;
                var src = img.getAttribute('src') || '';
                if (!src || seenSysSrcs[src]) return;
                seenSysSrcs[src] = true;
                var h3 = card.querySelector('h3, .project-title, .platform-title');
                var p = card.querySelector('p, .project-desc, .platform-desc');
                var tag = card.querySelector('.project-category, .platform-tag, span');
                var title = (h3 && h3.textContent.trim()) || (img && img.getAttribute('alt')) || 'System Project';
                allSystemImages.push({
                    src: src,
                    alt: title,
                    title: title,
                    desc: p ? p.textContent.trim() : '',
                    category: tag ? tag.textContent.trim().toUpperCase() : 'FULL-STACK SYSTEM'
                });
            });

            localSystemCards.forEach(function (card) {
                var img = card.querySelector('img');
                if (img) {
                    card.style.cursor = 'zoom-in';
                    card.addEventListener('click', function (e) {
                        if (e.target.closest('a')) return;
                        e.stopPropagation();
                        var targetSrc = img.getAttribute('src') || '';
                        var targetIdx = 0;
                        for (var i = 0; i < allSystemImages.length; i++) {
                            if (allSystemImages[i].src === targetSrc) {
                                targetIdx = i;
                                break;
                            }
                        }
                        openLightboxWithImages(allSystemImages, targetIdx);
                    });
                }
            });
        }

        // Lightbox Modal Controls
        if (elements.lbClose) {
            elements.lbClose.addEventListener('click', function (e) {
                e.stopPropagation();
                closeLightbox();
            });
        }

        elements.lightbox.addEventListener('click', function (e) {
            if (e.target === elements.lightbox || e.target.classList.contains('lightbox-backdrop')) {
                closeLightbox();
            }
        });

        if (elements.lbPrev) {
            elements.lbPrev.addEventListener('click', function (e) {
                e.stopPropagation();
                if (currentDeckImages.length) {
                    currentIndex = (currentIndex - 1 + currentDeckImages.length) % currentDeckImages.length;
                    updateLightboxImage();
                }
            });
        }

        if (elements.lbNext) {
            elements.lbNext.addEventListener('click', function (e) {
                e.stopPropagation();
                if (currentDeckImages.length) {
                    currentIndex = (currentIndex + 1) % currentDeckImages.length;
                    updateLightboxImage();
                }
            });
        }

        // Keyboard Navigation
        document.addEventListener('keydown', function (e) {
            if (!elements.lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + currentDeckImages.length) % currentDeckImages.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % currentDeckImages.length;
                updateLightboxImage();
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUniversalLightbox);
    } else {
        initUniversalLightbox();
    }

    // ===== CONSOLE EASTER EGG =====
    console.log('%cELADIO C. SABORBORO', 'font-size: 24px; font-weight: 900; color: #F02027; font-family: "Anton", sans-serif; letter-spacing: 2px;');
    console.log('%cGOHIGHLEVEL EXPERT / AUTOMATION SPECIALIST / DIGITAL SYSTEMS BUILDER', 'font-size: 12px; color: #8B8B8B; font-family: "Space Grotesk", monospace; letter-spacing: 1px;');
    console.log('%cLet\'s build systems that work. / eladiosaborboro1234@gmail.com', 'font-size: 12px; color: #F4F4F4; font-family: "Inter", sans-serif;');

    // ===== STANDALONE PROJECT VIDEOS =====
    (function () {
        var standaloneVideos = document.querySelectorAll('.website-project-grid video[data-src]');
        if (!standaloneVideos.length) return;

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        standaloneVideos.forEach(function (video) {
            var src = video.getAttribute('data-src');
            if (src) video.setAttribute('src', src);
            video.preload = 'metadata';
            video.muted = true;
            video.playsInline = true;
            video.loop = true;
        });

        if (prefersReduced) return;

        var videoObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var video = entry.target;
                if (entry.intersectionRatio > 0.28) {
                    var playAttempt = video.play();
                    if (playAttempt && playAttempt.catch) playAttempt.catch(function () {});
                } else {
                    try { video.pause(); } catch (e) {}
                }
            });
        }, { threshold: [0.15, 0.28, 0.6] });

        standaloneVideos.forEach(function (video) { videoObserver.observe(video); });
    })();

    // ===== FEATURED PROJECTS CAROUSEL BEHAVIOR =====
    (function () {
        var shell = document.querySelector('.work-carousel-shell');
        if (!shell) return;

        var viewport = shell.querySelector('.work-carousel-viewport');
        var track = shell.querySelector('.work-carousel-track');
        var prevBtn = shell.querySelector('.carousel-arrow-prev');
        var nextBtn = shell.querySelector('.carousel-arrow-next');

        // compute gap (in px) from computed style
        function parsePx(value) { return value ? parseFloat(value.replace('px','')) : 0; }

        function getStep() {
            var card = track.querySelector('.work-project-card');
            if (!card) return 0;
            var cardW = card.getBoundingClientRect().width;
            var gap = 22;
            try { gap = parsePx(getComputedStyle(track).gap); } catch (e) { }
            return Math.round(cardW + gap);
        }

        function updateCarouselFade() {
            var maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
            var atStart = viewport.scrollLeft <= 4;
            var atFinish = viewport.scrollLeft >= maxScroll - 4;
            viewport.classList.toggle('is-at-start', atStart);
            viewport.classList.toggle('is-at-end', atFinish);
        }

        function scrollByStep(direction) {
            var step = getStep();
            if (!step) return;
            viewport.scrollBy({ left: direction * step, behavior: 'smooth' });
            window.setTimeout(updateCarouselFade, 360);
        }

        viewport.addEventListener('scroll', function () {
            window.requestAnimationFrame(updateCarouselFade);
        });
        updateCarouselFade();

        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) { e.preventDefault(); scrollByStep(-1); });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) { e.preventDefault(); scrollByStep(1); });
        }

        (function enableAutoSlide() {
            var autoSlideTimer = null;
            var isPaused = false;

            function atEnd() {
                return viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 4;
            }

            function slideForward() {
                if (isPaused || document.hidden) return;
                if (atEnd()) {
                    viewport.scrollTo({ left: 0, behavior: 'smooth' });
                    window.setTimeout(updateCarouselFade, 360);
                } else {
                    scrollByStep(1);
                }
            }

            function startAutoSlide() {
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                stopAutoSlide();
                autoSlideTimer = window.setInterval(slideForward, 4200);
            }

            function stopAutoSlide() {
                if (autoSlideTimer) {
                    window.clearInterval(autoSlideTimer);
                    autoSlideTimer = null;
                }
            }

            shell.addEventListener('mouseenter', function () { isPaused = true; });
            shell.addEventListener('mouseleave', function () { isPaused = false; });
            shell.addEventListener('focusin', function () { isPaused = true; });
            shell.addEventListener('focusout', function () { isPaused = false; });
            document.addEventListener('visibilitychange', function () {
                if (document.hidden) {
                    stopAutoSlide();
                } else {
                    startAutoSlide();
                }
            });

            startAutoSlide();
        })();

        // Drag to scroll support for desktop (optional) - uses pointer events
        (function enableDragScroll() {
            var isDown = false; var startX; var scrollLeft;
            track.addEventListener('pointerdown', function (e) {
                isDown = true; track.classList.add('dragging'); startX = e.clientX; scrollLeft = viewport.scrollLeft; track.setPointerCapture(e.pointerId);
            });
            track.addEventListener('pointermove', function (e) {
                if (!isDown) return;
                var dx = startX - e.clientX; viewport.scrollLeft = scrollLeft + dx;
            });
            ['pointerup','pointerleave','pointercancel'].forEach(function(ev){ track.addEventListener(ev, function(e){ isDown = false; track.classList.remove('dragging'); }); });
        })();

        // Video initialization and autoplay management for carousel
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var videos = track.querySelectorAll('video');
        videos.forEach(function(video){
            var src = video.getAttribute('data-src');
            if (src && !video.getAttribute('src')) { video.setAttribute('src', src); }
            video.preload = 'auto';
            video.muted = true; 
            video.playsInline = true; 
            video.loop = true;
            var p = video.play();
            if (p && p.catch) p.catch(function(){});
        });

        var io = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                var vid = entry.target.querySelector('video');
                if (!vid) return;
                if (entry.intersectionRatio > 0.15 && !prefersReduced) {
                    var p = vid.play(); 
                    if (p && p.catch) p.catch(function(){});
                } else {
                    try { vid.pause(); } catch(e) {}
                }
            });
        }, { root: viewport, threshold: [0.1, 0.25, 0.6, 0.9] });

        // Observe each card article
        var cards = track.querySelectorAll('.work-project-card');
        cards.forEach(function(card){ io.observe(card); });

        // Ensure no page-level horizontal overflow
        window.addEventListener('resize', function(){ document.body.style.overflowX = 'hidden'; updateCarouselFade(); });
    })();

    // ===== GRAPHIC & DESIGN: CONTINUOUS 60FPS REVOLVING CROWN ARCH WITH SINGLE TOP HIGHLIGHT =====
    (function () {
        var arcStage = document.getElementById('arc-stage');
        if (!arcStage) return;

        var arcCards = Array.from(arcStage.querySelectorAll('.arc-card'));
        if (!arcCards.length) return;

        var totalCards = arcCards.length; // 17 cards (G1 to G17)
        var stepAngle = 22.5; // degrees between adjacent cards along the arch
        var totalCircuit = totalCards * stepAngle; // 382.5 deg full loop circuit

        // Base angle for each card slot in order (G1 to G17)
        var baseAngles = [];
        for (var i = 0; i < totalCards; i++) {
            baseAngles.push(i * stepAngle);
        }

        var angleOffset = 0;
        var autoSpeed = 0.07; // gentle, elegant continuous rotation
        var direction = 1; // rotate toward the right side

        var isDragging = false;
        var dragStartX = 0;
        var dragStartAngle = 0;
        var dragVelocity = 0;
        var lastDragX = 0;
        var lastDragTime = 0;

        function getRadius() {
            var w = window.innerWidth;
            if (w <= 640) return Math.min(Math.max(w * 0.45, 200), 260);
            if (w <= 900) return Math.min(Math.max(w * 0.38, 270), 360);
            return Math.min(Math.max(w * 0.33, 310), 430);
        }

        function getOriginY() {
            var w = window.innerWidth;
            if (w <= 640) return 480;
            if (w <= 900) return 530;
            return 580;
        }

        // Apply upward crown-arch coordinate math & highlight ONLY ONE card at the top apex
        function renderCards() {
            var radius = getRadius();
            var originY = getOriginY();
            var closestIdx = -1;
            var minApexDist = Infinity;

            // 1. Find the SINGLE card closest to the exact top center (0 deg)
            arcCards.forEach(function (card, idx) {
                var rawAngle = baseAngles[idx] + angleOffset;
                var half = totalCircuit / 2;
                var normAngle = ((((rawAngle + half) % totalCircuit) + totalCircuit) % totalCircuit) - half;
                var distFromApex = Math.abs(normAngle);
                if (distFromApex < minApexDist) {
                    minApexDist = distFromApex;
                    closestIdx = idx;
                }
            });

            // 2. Position all cards along the upward arch
            arcCards.forEach(function (card, idx) {
                var rawAngle = baseAngles[idx] + angleOffset;
                var half = totalCircuit / 2;
                var normAngle = ((((rawAngle + half) % totalCircuit) + totalCircuit) % totalCircuit) - half;
                var distFromApex = Math.abs(normAngle);

                // If outside visible arch window (+-84 deg), fade out
                if (distFromApex > 85) {
                    card.style.opacity = '0';
                    card.style.pointerEvents = 'none';
                    card.style.transform = 'translate(-50%, -50%) scale(0.5)';
                    card.classList.remove('is-apex');
                    return;
                }

                var rad = (normAngle * Math.PI) / 180;
                var x = radius * Math.sin(rad);
                var y = -radius * Math.cos(rad); // negative curves UPWARD into a dome/arch above text
                var rot = normAngle * 0.94; // tangent tilt along circle curve

                // Only the single card closest to top apex (within +-12 deg) gets highlighted
                var isTopApex = (idx === closestIdx && distFromApex < 13);

                var scale, opacity, zIndex;

                if (isTopApex) {
                    // HIGHLIGHT ONLY THIS SINGLE TOP CARD
                    card.classList.add('is-apex');
                    scale = 1.12; // slightly enlarged
                    opacity = 1.0;
                    zIndex = 50;
                } else {
                    card.classList.remove('is-apex');
                    var ratio = distFromApex / 75;
                    scale = Math.max(0.76, 0.96 - Math.pow(ratio, 1.3) * 0.22);
                    opacity = Math.max(0, Math.min(1, 1 - Math.pow(distFromApex / 80, 2.2)));
                    zIndex = Math.round((1 - Math.min(ratio, 1)) * 30);
                }

                card.style.top = originY + 'px';
                card.style.left = '50%';
                card.style.pointerEvents = 'auto';
                card.style.transform = 'translate(-50%, -50%) translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, 0) rotate(' + rot.toFixed(1) + 'deg) scale(' + scale.toFixed(3) + ')';
                card.style.opacity = opacity.toFixed(3);
                card.style.zIndex = zIndex;
            });
        }

        // Main continuous animation loop (never pauses, continuously rotating at 60fps)
        function tick() {
            if (!isDragging) {
                if (Math.abs(dragVelocity) > 0.01) {
                    angleOffset += dragVelocity;
                    dragVelocity *= 0.95; // inertia decay
                } else {
                    angleOffset += autoSpeed * direction; // continuous steady rotation
                }
            }

            renderCards();
            window.requestAnimationFrame(tick);
        }

        // Start continuous rotation immediately
        window.requestAnimationFrame(tick);

        // Drag / Touch to Spin with Physics Momentum
        function onPointerDown(e) {
            isDragging = true;
            dragStartX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            dragStartAngle = angleOffset;
            lastDragX = dragStartX;
            lastDragTime = performance.now();
            dragVelocity = 0;
            arcStage.classList.add('is-dragging');
        }

        function onPointerMove(e) {
            if (!isDragging) return;
            var clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            var dx = clientX - dragStartX;
            angleOffset = dragStartAngle + dx * 0.18;

            var now = performance.now();
            var dt = now - lastDragTime;
            if (dt > 10) {
                dragVelocity = ((clientX - lastDragX) / dt) * 1.8;
                lastDragX = clientX;
                lastDragTime = now;
            }
        }

        function onPointerUp() {
            if (isDragging) {
                isDragging = false;
                arcStage.classList.remove('is-dragging');
            }
        }

        arcStage.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);

        // Keyboard arrow navigation
        window.addEventListener('keydown', function (e) {
            if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
            if (e.key === 'ArrowLeft') {
                angleOffset += stepAngle;
                renderCards();
            } else if (e.key === 'ArrowRight') {
                angleOffset -= stepAngle;
                renderCards();
            }
        });

        // Window resize update
        window.addEventListener('resize', function () {
            renderCards();
        });

        // Initial setup
        renderCards();
    })();
})();
