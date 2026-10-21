import { GROUPS } from "../data";

const FilterBar = ({ query, onQueryChange, group, onGroupChange }) => (
  <div className="filter">
    <label htmlFor="search">Tìm kiếm</label>
    <input id="search" type="text" value={query} onChange={onQueryChange} />

    <label htmlFor="groupFilter">Nhóm</label>
    <select id="groupFilter" value={group} onChange={onGroupChange}>
      <option value="all">Tất cả</option>
      {GROUPS.map((g) => (
        <option key={g} value={g}>{g}</option>
      ))}
    </select>
  </div>
);

export default FilterBar;