export default function GroupSelector({ groups, activeGroupId, setActiveGroup }) {
  return (
    <div className="mb-6">
      <label className="mr-2 font-semibold">Select Group:</label>
      <select
        className="border p-2 rounded"
        value={activeGroupId}
        onChange={(e) => setActiveGroup(Number(e.target.value))}
      >
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
  );
}