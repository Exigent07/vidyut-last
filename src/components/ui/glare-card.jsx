"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";


export const GlareCard = ({
    children,
    className,
}) => {
    const isPointerInside = useRef(false);
    const refElement = useRef(null);
    const state = useRef({
        glare: { x: 50, y: 50 },
        background: { x: 50, y: 50 },
        rotate: { x: 0, y: 0 },
    });

    const containerStyle = {
        "--m-x": "50%",
        "--m-y": "50%",
        "--r-x": "0deg",
        "--r-y": "0deg",
        "--bg-x": "50%",
        "--bg-y": "50%",
        "--duration": "300ms",
        "--foil-size": "100%",
        "--opacity": "0",
        "--radius": "20px",
        "--easing": "ease",
        "--transition": "var(--duration) var(--easing)",
    };

    const backgroundStyle = {
        "--step": "5%",
        "--pattern": "var(--foil-svg) center/100% no-repeat",
        "--rainbow":
            "repeating-linear-gradient( 0deg, rgb(50,50,50) calc(var(--step) * 1), rgb(80,80,80) calc(var(--step) * 2), rgb(110,110,110) calc(var(--step) * 3), rgb(140,140,140) calc(var(--step) * 4), rgb(170,170,170) calc(var(--step) * 5), rgb(200,200,200) calc(var(--step) * 6), rgb(230,230,230) calc(var(--step) * 7) ) 0% var(--bg-y)/200% 700% no-repeat",
        "--diagonal":
            "repeating-linear-gradient( 128deg, #1a1a1a 0%, #444 3.8%, #444 4.5%, #444 5.2%, #1a1a1a 10%, #1a1a1a 12% ) var(--bg-x) var(--bg-y)/300% no-repeat",
        "--shade":
            "radial-gradient( farthest-corner circle at var(--m-x) var(--m-y), rgba(255,255,255,0.05) 12%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.15) 120% ) var(--bg-x) var(--bg-y)/300% no-repeat",
        backgroundBlendMode: "hue, hue, hue, overlay",
    };

    const updateStyles = () => {
        if (refElement.current) {
            const { background, rotate, glare } = state.current;
            refElement.current.style.setProperty("--m-x", `${glare.x}%`);
            refElement.current.style.setProperty("--m-y", `${glare.y}%`);
            refElement.current.style.setProperty("--r-x", `${rotate.x}deg`);
            refElement.current.style.setProperty("--r-y", `${rotate.y}deg`);
            refElement.current.style.setProperty("--bg-x", `${background.x}%`);
            refElement.current.style.setProperty("--bg-y", `${background.y}%`);
        }
    };

    return (
        <div
            style={containerStyle}
            className={cn(
                "relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform overflow-hidden rounded-[var(--radius)]",
                className
            )}
            ref={refElement}

            onPointerMove={(event) => {
                const rotateFactor = 0.4;
                const rect = event.currentTarget.getBoundingClientRect();
                const position = {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top,
                };
                const percentage = {
                    x: (100 / rect.width) * position.x,
                    y: (100 / rect.height) * position.y,
                };
                const delta = {
                    x: percentage.x - 50,
                    y: percentage.y - 50,
                };

                const { background, rotate, glare } = state.current;
                background.x = 50 + percentage.x / 4 - 12.5;
                background.y = 50 + percentage.y / 3 - 16.67;
                rotate.x = -(delta.x / 3.5) * rotateFactor;
                rotate.y = (delta.y / 2) * rotateFactor;
                glare.x = percentage.x;
                glare.y = percentage.y;

                updateStyles();
            }}
            onPointerEnter={() => {
                isPointerInside.current = true;
                if (refElement.current) {
                    setTimeout(() => {
                        if (isPointerInside.current) {
                            refElement.current?.style.setProperty("--duration", "0s");
                        }
                    }, 300);
                }
            }}
            onPointerLeave={() => {
                isPointerInside.current = false;
                if (refElement.current) {
                    refElement.current.style.removeProperty("--duration");
                    refElement.current.style.setProperty("--r-x", `0deg`);
                    refElement.current.style.setProperty("--r-y", `0deg`);
                }
            }}
        >
            <div className="h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] border border-slate-800 hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden">
                <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
                    <div className={cn("h-full w-full bg-slate-950", className)}>
                        {children}
                    </div>
                </div>
                <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]" />
                <div
                    className="w-full h-full grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))] [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)] relative after:content-[''] after:grid-area-[inherit] after:bg-repeat-[inherit] after:bg-attachment-[inherit] after:bg-origin-[inherit] after:bg-clip-[inherit] after:bg-[inherit] after:mix-blend-exclusion after:[background-size:var(--foil-size),_200%_400%,_800%,_200%] after:[background-position:center,_0%_var(--bg-y),_calc(var(--bg-x)*_-1)_calc(var(--bg-y)*_-1),_var(--bg-x)_var(--bg-y)] after:[background-blend-mode:soft-light,_hue,_hard-light]"
                    style={{ ...backgroundStyle }}
                />
            </div>
        </div>
    );
};
