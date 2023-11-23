const filesController = {
	uploadFile: async (req, res) => {
		try {
			if (!req.files) {
				res.send({
					status: false,
					message: "No file uploaded",
				});
			} else {
				//Use the name of the input field to retrieve the uploaded file
				let file = req.files.file;

				//Use the mv() method to place the file in upload directory (i.e. "uploads")
				const uploadPath = __dirname + "/../../uploads/" + file.name
				file.mv(uploadPath, (err) => {
					if (err) {
						res.status(500).send(err);
					}
					console.log("File uploaded successfully")
					//send response
					res.json({
						status: true,
						message: "File is uploaded",
						data: {
							name: file.name,
							mimetype: file.mimetype,
							size: file.size,
						},
					});
				});

			}
		} catch (err) {
			res.status(500).send(err);
		}
	}
}

module.exports = filesController;