import { useState, useEffect } from 'react';
import axios from 'axios';

const EditRecord = () => {
	const [formData, setFormData] = useState({});
	const [companies, setCompanies] = useState({});
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		axios
			.get('../../record.json')
			.then((response) => {
				setFormData(response.data);
			})
			.catch((error) => {
				setErrorMessage('Error fetching data.');
			});

		axios
			.get('../../companies.json')
			.then((response) => {
				setCompanies(response.data.data);
			})
			.catch((error) => {
				setErrorMessage('Error fetching companies data.');
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post('../../data.json', formData)
			.then((response) => {
				setSuccessMessage('Data saved successfully.');
			})
			.catch((error) => {
				if (error.response && error.response.status === 500) {
					setErrorMessage('Error saving data (status 500).');
				} else {
					setErrorMessage('Error saving data.');
				}
			});
	};

	return (
		<div>
			<h2>Edit Record</h2>
			{successMessage && <p className='text-green-500'>{successMessage}</p>}
			{errorMessage && <p className='text-red-500'>{errorMessage}</p>}

			<form onSubmit={handleSubmit}>
				<div>
					<label>Fullname:</label>
					<input type='text' name='fullname' value={formData.fullname} />
				</div>
				<div>
					<label>Phone:</label>
					<input type='tel' name='mobile' value={formData.mobile} />
				</div>
				<div>
					<label>Company:</label>
					<select name='company' value={formData.company}>
						{Object.keys(companies).map((key) => (
							<option key={key} value={key}>
								{companies[key]}
							</option>
						))}
					</select>
				</div>
				{/* Add similar code for other fields from schema.json */}
				<button type='submit'>Save</button>
			</form>
		</div>
	);
};

export default EditRecord;
