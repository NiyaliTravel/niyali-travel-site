import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomIn, ZoomOut, Maximize, Play, Pause } from "lucide-react";

interface VRViewerProps {
  imageUrl: string;
  title?: string;
  className?: string;
}

export default function VRViewer({ imageUrl, title = "VR Tour", className = "" }: VRViewerProps) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<number>();

  useEffect(() => {
    if (isAutoRotating) {
      autoRotateRef.current = setInterval(() => {
        setRotation(prev => (prev + 0.5) % 360);
      }, 50);
    } else {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isAutoRotating]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation(prev => prev + deltaX * 0.5);
    setPosition(prev => ({
      x: Math.max(-50, Math.min(50, prev.x + deltaY * 0.1)),
      y: prev.y
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(3, prev + 0.2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.5, prev - 0.2));
  };

  const handleReset = () => {
    setRotation(0);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsAutoRotating(false);
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(prev => !prev);
  };

  const handleFullscreen = () => {
    if (imageRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className={`vr-viewer ${className}`} data-testid="vr-viewer">
      <div
        ref={imageRef}
        className="relative w-full h-full bg-black rounded-lg overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* VR Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
          style={{
            backgroundImage: `url(${imageUrl})`,
            transform: `
              translateX(${position.x}%) 
              translateY(${position.y}%) 
              scale(${zoom}) 
              rotateY(${rotation}deg)
            `,
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Loading overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-sm opacity-75">Click and drag to explore • Use controls below</p>
          </div>
        </div>

        {/* VR Controls */}
        <div className="vr-controls absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          <Button
            size="sm"
            variant="secondary"
            className="vr-control-btn bg-white bg-opacity-90 hover:bg-white"
            onClick={toggleAutoRotate}
            data-testid="vr-auto-rotate"
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="vr-control-btn bg-white bg-opacity-90 hover:bg-white"
            onClick={handleZoomOut}
            data-testid="vr-zoom-out"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="vr-control-btn bg-white bg-opacity-90 hover:bg-white"
            onClick={handleZoomIn}
            data-testid="vr-zoom-in"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="vr-control-btn bg-white bg-opacity-90 hover:bg-white"
            onClick={handleReset}
            data-testid="vr-reset"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="vr-control-btn bg-white bg-opacity-90 hover:bg-white"
            onClick={handleFullscreen}
            data-testid="vr-fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>

        {/* Info Overlay */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-lg">
          <h3 className="font-semibold">{title}</h3>
          <div className="text-sm opacity-75 mt-1">
            <p>Zoom: {Math.round(zoom * 100)}%</p>
            <p>Rotation: {Math.round(rotation)}°</p>
          </div>
        </div>

        {/* Navigation hints */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-lg text-sm">
          <p className="font-medium mb-2">Navigation:</p>
          <ul className="space-y-1 text-xs opacity-75">
            <li>• Drag to rotate view</li>
            <li>• Use controls to zoom</li>
            <li>• Click play for auto-rotate</li>
            <li>• Fullscreen for immersion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
