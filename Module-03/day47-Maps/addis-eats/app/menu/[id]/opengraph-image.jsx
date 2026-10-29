import { ImageResponse } from "next/og";
import menuData from "../../../data/menu.json";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
     const { id } = await params;
     const dish = menuData.data.find((d) => d.slug === id);

     const title = dish?.nameEn ?? "Addis Eats";
     const price = dish ? `${dish.priceETB} ETB` : "";

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
                         background: "#7c2d12",
                         color: "#faf6eb",
                    }}
               >
                    <div style={{ fontSize: 28, opacity: 0.8, marginBottom: 12 }}>
                         Addis Eats
                    </div>
                    <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
                         {title}
                    </div>
                    {price ? (
                         <div style={{ fontSize: 36, marginTop: 24, color: "#eab308" }}>
                              {price}
                         </div>
                    ) : null}
               </div>
          ),
          { ...size },
     );
}