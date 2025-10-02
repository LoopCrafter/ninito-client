import UserData from "./_components/userData";

export default function Profile() {
  return (
    <UserData
      user={{
        id: "1",
        email: "hamed@example.com",
        password: "securePassword123",
        firstName: "Hamed",
        lastName: "Ostovar",
        isVerified: true,
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: "https://example.com/avatar.png",
        mobile: "+43123456789",
        gender: "male",
      }}
    />
  );
}
