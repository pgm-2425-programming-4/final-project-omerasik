export function Pagination({
  currentPage,
  pageCount,
  onPageChanged,
  pageSize,
  onPageSizeChange,
}) {
  const pages = [1];

  if (pageCount > 6) {
    if (currentPage > 3) pages.push(null);
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(pageCount - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < pageCount - 2) pages.push(null);
  } else {
    for (let i = 2; i < pageCount; i++) pages.push(i);
  }

  if (pageCount > 1) pages.push(pageCount);

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        disabled={currentPage === 1}
        onClick={() => onPageChanged(currentPage - 1)}
      >
        Previous
      </button>

      <ul className="pagination__list">
        {pages.map((num, idx) =>
          num === null ? (
            <li key={idx} className="pagination__item pagination__item--ellipsis">
              …
            </li>
          ) : (
            <li key={idx} className="pagination__item">
              <button
                className={
                  "pagination__button" +
                  (num === currentPage ? " pagination__button--active" : "")
                }
                onClick={() => onPageChanged(num)}
              >
                {num}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        className="pagination__button"
        disabled={currentPage === pageCount}
        onClick={() => onPageChanged(currentPage + 1)}
      >
        Next
      </button>

      <select
        className="pagination__select"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option value={3}>3 per page</option>
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
      </select>
    </div>
  );
}
