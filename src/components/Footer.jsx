export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 pt-12 pb-6 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Logo và mô tả */}
        <div className="max-w-sm">
          <div className="text-2xl font-bold text-black mb-2">📩 Postcrafts</div>
          <p className="text-sm text-gray-600 mb-4">
            Chúng tôi cung cấp giải pháp thiết kế hiện đại và linh hoạt để giúp bạn xây dựng trải nghiệm số tuyệt vời.
          </p>
          <div className="flex space-x-3 text-gray-800">
            <a href="#"><i className="fab fa-twitter bg-gray-300 p-2 rounded-full" /></a>
            <a href="#"><i className="fab fa-facebook bg-gray-300 p-2 rounded-full" /></a>
            <a href="#"><i className="fab fa-instagram bg-gray-300 p-2 rounded-full" /></a>
            <a href="#"><i className="fab fa-github bg-gray-300 p-2 rounded-full" /></a>
          </div>
        </div>

        {/* Cột: Công ty */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Công ty</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Tính năng</a></li>
            <li><a href="#">Dự án</a></li>
            <li><a href="#">Tuyển dụng</a></li>
          </ul>
        </div>

        {/* Cột: Hỗ trợ */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Hỗ trợ</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Hỗ trợ khách hàng</a></li>
            <li><a href="#">Chi tiết giao hàng</a></li>
            <li><a href="#">Điều khoản & Điều kiện</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        {/* Đăng ký nhận tin */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900 uppercase text-xs">Đăng ký nhận bản tin</h4>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded mt-2">
            Đăng ký
          </button>
        </div>
      </div>

      {/* Đường kẻ ngang */}
      <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
        © 2025, Mọi quyền được bảo lưu bởi Postcrafts
      </div>
    </footer>
  );
}
