import { weekHours } from "@/data/site";

export function Hours() {
  return (
    <section id="hours" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-lg overflow-hidden rounded-[2rem] bg-milk shadow-xl ring-4 ring-sky/30">
        <div className="bg-sky px-6 py-5 text-center text-white">
          <p className="font-display text-2xl font-bold">🌅 เปิดตั้งแต่ตี 5</p>
          <p className="text-sm text-white/90">เปิดทุกวันจันทร์–เสาร์ • 05:00 – 09:00 น.</p>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {weekHours.map((h) => (
              <tr key={h.day} className={`border-b border-bean/30 ${h.closed ? "bg-blush/15" : ""}`}>
                <td className="px-6 py-3 font-semibold text-cocoa">{h.day}</td>
                <td className={`font-display px-6 py-3 text-right font-bold ${h.closed ? "text-blush" : "text-sky-deep"}`}>
                  {h.closed ? "🔴 ปิด" : h.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="space-y-1 px-6 py-5 text-center">
          <p className="font-display font-bold text-pumpkin">🥛 แม่ทำสดใหม่ทุกเช้า มีจำนวนจำกัด — หมดแล้วหมดเลยน้า 💛</p>
          <p className="text-xs text-cocoa/65">หากขายหมดก่อน 09:00 น. ร้านจะปิดก่อนเวลา</p>
          <p className="text-xs text-cocoa/65">🌱 แม่เริ่มเตรียมน้ำเต้าหู้ตั้งแต่ตี 3–4 เพื่อให้พร้อมขายในตอนเช้า</p>
        </div>
      </div>
    </section>
  );
}
