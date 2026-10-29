import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
     return new ImageResponse(
          (
               <div
                    style={{
                         width: "100%",
                         height: "100%",
                         display: "flex",
                         flexDirection: "column",
                         justifyContent: "center",
                         padding: 80,
                         background: "#9a3412",
                         color: "#faf6eb",
                         fontSize: 64,
                         fontWeight: 700,
                    }}
               >
                    <div style={{ fontSize: 28, opacity: 0.85, marginBottom: 16 }}>
                         Ethiopian kitchen
                    </div>
                    <div>Addis Eats</div>
                    <div style={{ fontSize: 32, marginTop: 24, fontWeight: 400 }}>
                         Flavors from Addis, at your door
                    </div>
               </div>
          ),
          { ...size },
     );
}