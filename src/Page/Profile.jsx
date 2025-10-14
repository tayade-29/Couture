import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#F8F4F0' }}>
        <p className="text-lg" style={{ color: '#4B2142' }}>No profile found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12" style={{ backgroundColor: '#F8F4F0' }}>
      <div className="bg-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#4B2142' }}>
          Profile Details
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b" style={{ borderColor: '#C6A8CE' }}>
            <span className="text-sm font-semibold mb-1 sm:mb-0 sm:w-40" style={{ color: '#4B2142' }}>Name</span>
            <span className="text-lg flex-1" style={{ color: '#3A2D35' }}>{user.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b" style={{ borderColor: '#C6A8CE' }}>
            <span className="text-sm font-semibold mb-1 sm:mb-0 sm:w-40" style={{ color: '#4B2142' }}>Email</span>
            <span className="text-lg flex-1" style={{ color: '#3A2D35' }}>{user.email}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b" style={{ borderColor: '#C6A8CE' }}>
            <span className="text-sm font-semibold mb-1 sm:mb-0 sm:w-40" style={{ color: '#4B2142' }}>Phone</span>
            <span className="text-lg flex-1" style={{ color: '#3A2D35' }}>{user.phoneNo}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b" style={{ borderColor: '#C6A8CE' }}>
            <span className="text-sm font-semibold mb-1 sm:mb-0 sm:w-40" style={{ color: '#4B2142' }}>City</span>
            <span className="text-lg flex-1" style={{ color: '#3A2D35' }}>{user.city}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b" style={{ borderColor: '#C6A8CE' }}>
            <span className="text-sm font-semibold mb-1 sm:mb-0 sm:w-40" style={{ color: '#4B2142' }}>Zipcode</span>
            <span className="text-lg flex-1" style={{ color: '#3A2D35' }}>{user.zipcode}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center py-4" style={{ borderColor: '#C6A8CE' }}>
            <span className="text-sm font-semibold mb-1 sm:mb-0 sm:w-40" style={{ color: '#4B2142' }}>Account Type</span>
            <span className="text-lg flex-1" style={{ color: '#3A2D35' }}>
              {user.isAdmin ? "Administrator" : "User"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
