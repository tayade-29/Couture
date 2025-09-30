import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No profile found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        
        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Phone:</span> {user.phoneNo}</p>
          <p><span className="font-semibold">City:</span> {user.city}</p>
          <p><span className="font-semibold">Zipcode:</span> {user.zipcode}</p>
          <p><span className="font-semibold">Role:</span> {user.isAdmin ? "Admin" : "User"}</p>
        </div>
      </div>
    </div>
  );
}
