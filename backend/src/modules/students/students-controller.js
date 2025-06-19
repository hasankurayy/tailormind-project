const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");
const { StudentAddSchema, StudentSetStatusSchema } = require("./students-schema");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents(req.query);
    // for example added success interceptor
    res.success(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const validatedData = StudentAddSchema.parse(req.body);
    const result = await addNewStudent(validatedData);
    res.status(200).json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const validatedData = StudentAddSchema.parse({...req.body, userId: parseInt(req.params.id)});
    const result = await updateStudent(validatedData);
    res.status(200).json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const student = await getStudentDetail(req.params.id);
    res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const validatedData = StudentSetStatusSchema.parse(req.body);
    const payload = {
        userId: parseInt(req.params.id),
        reviewerId: req.user.id,
        ...validatedData,
    }
    const result = await setStudentStatus(payload);
    res.status(200).json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
