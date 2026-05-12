import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic parameters
    const title = searchParams.get('title') || 'Itahari International College';
    const subtitle = searchParams.get('subtitle') || 'World-Class Education in Nepal';
    const section = searchParams.get('section') || 'Excellence in IT & Business';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 25% 25%, #21409A 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a1a1a 0%, transparent 50%)',
            padding: '80px',
            position: 'relative',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Logo Placeholder / Top Bar */}
          <div style={{ position: 'absolute', top: 60, left: 80, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#74C044', marginRight: 15 }} />
            <span style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', letterSpacing: '0.05em' }}>ITAHARI INTERNATIONAL COLLEGE NEPAL</span>
          </div>

          {/* Section Tag */}
          <div 
            style={{ 
              backgroundColor: 'rgba(116, 192, 68, 0.15)', 
              color: '#74C044', 
              padding: '8px 20px', 
              borderRadius: '100px', 
              fontSize: 20, 
              fontWeight: 600,
              marginBottom: 40,
              border: '1px solid rgba(116, 192, 68, 0.3)'
            }}
          >
            {section}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: 20,
              maxWidth: '800px',
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '700px',
            }}
          >
            {subtitle}
          </div>

          {/* Glassmorphic Accent Shape */}
          <div
            style={{
              position: 'absolute',
              right: '-100px',
              top: '10%',
              width: '400px',
              height: '80%',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(40px)',
              borderRadius: '64px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transform: 'rotate(-5deg)',
            }}
          />

          {/* Footer Decoration */}
          <div style={{ position: 'absolute', bottom: 60, right: 80, color: 'rgba(255, 255, 255, 0.3)', fontSize: 20 }}>
            iic.edu.np
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
