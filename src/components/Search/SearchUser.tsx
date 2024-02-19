import { Member } from "types/Search/Search";

interface SearchMemberProps {
  searchResults: Member[] | undefined;
}
const SearchUser: React.FC<SearchMemberProps> = ({ searchResults }) => {
  return (
    <div>
      유저
      <ul>
        {searchResults && searchResults.map((member) => (
          <li key={member.id}>
            <p>{member.username}</p>
            <p>{member.introduction}</p>
            {member.profileImageUrl && (
              <img src={member.profileImageUrl} alt="" />
            )}

          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchUser;