# Redis job queue
q = Queue(connection=conn)

@data_set_routes.route('/data-sets')
@login_required
def data():
    curr_user = current_user.to_dict()
    if curr_user["type_id"] == 1: 
        data = db.session.query(DataSet).all()
        return jsonify([data_set.to_dict() for data_set in data])
    else:
        return {'errors': ['Unauthorized']}, 401

# Helper function to make the data-set upload with the frontend asynchronous for polling
def async_ds_post(file_name, file_contents):
    # from app import app, db
    # with app.app_context():
    file_name_list = file_name.split(".")
    if file_name_list[-1] == "dta":
        data = pd.io.stata.read_stata(file)
        csv_file = data.to_csv()
        file_final = pickle.dumps(csv_file)

    elif file_name_list[-1] == "zip":
        file_like_object = BytesIO(file_contents)
        zipfile_ob = zipfile.ZipFile(file_like_object)
        file_names = zipfile_ob.namelist()
        file_names = [file_name for file_name in file_names if not "__MACOSX/." in file_name]
        files = [zipfile_ob.open(name).read() for name in file_names]
        file_final = files[0].decode("utf-8")
        file_final = pickle.dumps(file_final)

    elif file_name_list[-1] == "csv":
        csv_file=file_contents
        print("GOT HERE IN CSV READER")
        file_final = pickle.dumps(csv_file)
    else :
        return {"errors": "This file type is not accepted, please only upload .dta, .csv, or .csv.zip file types."}
    # try:
    data_set = DataSet(
        data_set_name=file_name,
        data_set=file_final
    )
    db.session.add(data_set)
    db.session.commit()
    # except:
        # return {"errors": "Unable to add file to database, try again."}
    # return

# Workaround for Heroku front-end to back-end open connections limited to 30 seconds
@data_set_routes.route("/upload", methods=['POST'])
@login_required
def data_file_upload():
    file = request.files['data-set']
    # print("FILE CONTENT TYPE_________",list(file.read()))
    types = ["application/zip", "text/csv", "application/octet-stream"]
    if (file and file.content_type in types):
        # post_ds = threading.Thread(target = async_ds_post, args=[file])
        q.enqueue_call(func=async_ds_post, args=(file.filename, file.read()))
        return jsonify("Successful file upload.")
    else:
        return {"errors": ["Files were not successfully passed to the API."]}, 500
