import { useState } from 'react';
import users from '../data.json';
import schema from '../schema.json';

const App = () => {
	const { fields } = schema;

	const visibleFields = fields.filter((field) => field.show_in_listing);

	visibleFields.sort((a, b) => a.seq - b.seq);

	const [currentPage, setCurrentPage] = useState(1);
	const perPage = 25;
	const lastIndex = currentPage * perPage;
	const firstIndex = lastIndex - perPage;

	const firstPage = users.slice(firstIndex, lastIndex);

	const npage = Math.ceil(users.length / perPage);
	const numbers = [...Array(npage + 1).keys()].slice(1);

	const prevPage = () => {
		if (currentPage !== firstIndex) setCurrentPage(currentPage - 1);
	};

	const nextPage = () => {
		if (currentPage !== npage) setCurrentPage(currentPage + 1);
	};

	const changePage = (id) => {
		setCurrentPage(id);
	};

	return (
		<div className='p-6'>
			<h1 className='text-center text-6xl'>Listing Page</h1>

			<div className='mt-8'>
				<table className='table-auto'>
					<thead>
						<tr>
							{visibleFields.map((field) => (
								<th key={field.key} className='px-4 py-2'>
									{field.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{firstPage.map((user) => (
							<tr key={user.id}>
								{visibleFields.map((field) => (
									<td key={field.key} className='px-4 py-2'>
										{user[field.key]}
									</td>
								))}
								<td className='px-4 py-2 flex gap-2'>
									<button onClick={() => handleUpdate(user)}>Update</button>
									<button onClick={() => handleRemove(user)}>Remove</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<nav className='mt-4 flex justify-center'>
				<ul className='flex justify-center gap-5'>
					<li>
						<a
							href='#'
							className='text-blue-500 py-2 px-4 bg-blue-200 rounded-lg'
							onClick={prevPage}
						>
							Prev
						</a>
					</li>

					{numbers.map((n, i) => (
						<li key={i} className={` ${currentPage === n ? 'active' : ''}`}>
							<a
								href='#'
								className={`text-blue-500  ${
									currentPage === n ? 'font-bold' : ''
								}`}
								onClick={() => changePage(n)}
							>
								{n}
							</a>
						</li>
					))}

					<li className=''>
						<a
							href='#'
							className='text-blue-500 py-2 px-4 bg-blue-200 rounded-lg'
							onClick={nextPage}
						>
							Next
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default App;
