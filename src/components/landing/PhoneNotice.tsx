export function PhoneNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`rounded-2xl bg-cream px-4 py-3 text-xs leading-relaxed text-cocoa/70 ring-1 ring-bean/40 ${className}`}>
      ⚠️ <strong className="text-cocoa">หมายเหตุ:</strong> กรุณาใช้หมายเลขนี้สำหรับสอบถามสินค้าและการสั่งซื้อเท่านั้น
      ทางร้านขอความร่วมมือ งดโทรเล่นและโทรก่อกวน เนื่องจากแม่เป็นผู้รับสายและดูแลร้านด้วยตัวเอง
      หากมีการโทรเล่นหรือก่อกวน ทางร้านขอสงวนสิทธิ์ในการบล็อกหมายเลขโทรศัพท์
    </p>
  );
}
