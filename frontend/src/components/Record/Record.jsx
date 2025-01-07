export const Record = ({ userInfo }) => {
  return (
    <div>
      닉네임은<h2>{userInfo?.gameName}</h2>
      puuid는<p>{userInfo?.puuid}</p>
      태그명은<p>{userInfo?.tagLine}</p>
    </div>
  );
};
