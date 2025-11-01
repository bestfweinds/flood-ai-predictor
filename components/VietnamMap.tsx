import React, { useRef, useEffect, useState } from 'react';
import { RISK_COLORS, REGIONS } from '../constants';
import type { Region, Province } from '../types';
import { SIMPLIFIED_VIETNAM_GEO } from '../data/vietnam-simplified-geo';

interface VietnamMapProps {
    provinceDataMap: Record<string, Province>;
    onSelectProvince: (provinceId: string) => void;
    onClearSelection: () => void;
    selectedProvinceId: string | null;
    activeRegion: Region;
}

// A custom hook to observe the size of an element
const useResize = (ref: React.RefObject<HTMLElement>) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const resizeObserver = new ResizeObserver(entries => {
            if (!entries || entries.length === 0) return;
            const { width, height } = entries[0].contentRect;
            setDimensions({ width, height });
        });

        resizeObserver.observe(element);
        return () => resizeObserver.unobserve(element);
    }, [ref]);
    return dimensions;
};

type Bounds = { minX: number; minY: number; maxX: number; maxY: number; width: number; height: number; };

const calculateBounds = (geos: typeof SIMPLIFIED_VIETNAM_GEO): Bounds => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    geos.forEach(p => {
        const points = p.points.split(' ').map(pt => pt.split(',').map(Number));
        points.forEach(([x, y]) => {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        });
    });
    return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
};

const MAP_BOUNDS = calculateBounds(SIMPLIFIED_VIETNAM_GEO);

const REGION_BOUNDS = Object.keys(REGIONS).reduce((acc, region) => {
    if (region === 'All') return acc;
    const regionProvinces = SIMPLIFIED_VIETNAM_GEO.filter(p => REGIONS[region as keyof typeof REGIONS].includes(p.id));
    acc[region as Region] = calculateBounds(regionProvinces);
    return acc;
}, {} as Record<Region, Bounds>);

const PROVINCE_BOUNDS = SIMPLIFIED_VIETNAM_GEO.reduce((acc, p) => {
    acc[p.id] = calculateBounds([p]);
    return acc;
}, {} as Record<string, Bounds>);


export const VietnamMap: React.FC<VietnamMapProps> = ({ provinceDataMap, onSelectProvince, selectedProvinceId, activeRegion, onClearSelection }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useResize(containerRef);
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });

    useEffect(() => {
        if (width === 0 || height === 0) return;

        let targetBounds: Bounds;

        if (selectedProvinceId && PROVINCE_BOUNDS[selectedProvinceId]) {
            targetBounds = PROVINCE_BOUNDS[selectedProvinceId];
        } else if (activeRegion !== 'All' && REGION_BOUNDS[activeRegion]) {
            targetBounds = REGION_BOUNDS[activeRegion];
        } else {
            targetBounds = MAP_BOUNDS;
        }

        if (!targetBounds || targetBounds.width === 0 || targetBounds.height === 0) {
            targetBounds = MAP_BOUNDS; // Fallback
        }
        
        // For single provinces, the 'width' might be 0 if it's a vertical line, so add a minimum size
        const effectiveWidth = Math.max(targetBounds.width, 5);
        const effectiveHeight = Math.max(targetBounds.height, 5);
        
        const scaleX = width / effectiveWidth;
        const scaleY = height / effectiveHeight;
        const scale = Math.min(scaleX, scaleY) * (selectedProvinceId ? 0.4 : 0.9); // Apply more padding for a single selected province to 'zoom it out' slightly

        const x = width / 2 - (targetBounds.minX + targetBounds.width / 2) * scale;
        const y = height / 2 - (targetBounds.minY + targetBounds.height / 2) * scale;

        setTransform({ x, y, scale });

    }, [selectedProvinceId, activeRegion, width, height]);
    
    const handleSvgClick = (event: React.MouseEvent<SVGSVGElement>) => {
        // Clear selection only if the click is on the SVG background
        if (event.target === event.currentTarget) {
            onClearSelection();
        }
    };

    const safeScale = transform.scale || 1; // Prevent division by zero

    return (
        <div ref={containerRef} className="w-full h-full">
            <svg className="w-full h-full" onClick={handleSvgClick}>
                <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`} style={{ transition: 'transform 0.75s ease-out' }}>
                    {SIMPLIFIED_VIETNAM_GEO.map((provinceGeo) => {
                        const isSelected = selectedProvinceId === provinceGeo.id;
                        const data = provinceDataMap[provinceGeo.id];
                        const colorClass = data ? RISK_COLORS[data.riskLevel] : 'fill-gray-600';
                        
                        return (
                            <polygon
                                key={provinceGeo.id}
                                points={provinceGeo.points}
                                className={`${colorClass} transition-all duration-200`}
                                stroke={isSelected ? '#f3f4f6' : '#374151'}
                                strokeWidth={isSelected ? 2 / safeScale : 0.5 / safeScale}
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent svg's onClick from firing
                                    onSelectProvince(provinceGeo.id);
                                }}
                                onMouseOver={(e) => {
                                    if (!isSelected) e.currentTarget.style.stroke = '#a7a7a7';
                                }}
                                onMouseOut={(e) => {
                                    if (!isSelected) e.currentTarget.style.stroke = '#374151';
                                }}
                            />
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};
