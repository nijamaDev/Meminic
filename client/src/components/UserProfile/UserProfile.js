import "./UserProfile.css";

const UserProfile = ({ profileImg, name, role }) => {
  return (
    <div className="profile__container">
      <div className="profile__info">
        <h2 className="profile_information">{name}</h2>
        <h3 className="profile_information">{role}</h3>
      </div>
      <img src={profileImg} alt="photo_profile" />
    </div>
  );
};

export default UserProfile;
