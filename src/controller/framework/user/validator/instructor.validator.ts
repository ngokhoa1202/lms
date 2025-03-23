import { AcademicGrade } from '@src/constants/enum/degree/academicGrade.enum';
import { AcademicRank } from '@src/constants/enum/degree/academicRank.enum';
import { StudyFormat } from '@src/constants/enum/degree/studyFormat.enum';
import UserValidator from '@src/controller/framework/user/validator/user.validator';
import { body, param } from 'express-validator';

const gettingById = [
  param('id').trim().escape().notEmpty().withMessage('ID must not be empty')
    .isUUID().withMessage('ID must be a valid UUID')
];

const creation = [
  ...UserValidator.creation,
  body('degrees').isArray({ min: 0, max: 10 }).withMessage('Degrees must be an array of up to 10 elements'),
  body('degrees.*.rank').trim().escape().notEmpty().withMessage('Each degree rank must not be empty')
    .isIn(Object.values(AcademicRank)).withMessage(`Each degree rank must be one of the following values: ${Object.values(AcademicRank)}`),
  body('degrees.*.major').trim().escape().notEmpty().withMessage('Each degree major must not be empty')
    .isLength({ max: 255 }).withMessage('Each degree major must be at most 255 characters long'),
  body('degrees.*.issueDate').trim().escape().notEmpty().withMessage('Each degree achieve date must not be empty')
    .isISO8601().withMessage('Each degree issue date must be a valid date in ISO 8601 format'),
  body('degree.*.universityId').trim().escape().notEmpty().withMessage('Each degree university ID must not be empty')
    .isInt({ min: 1 }).withMessage('Each degree university ID must be a positive integer'),
  body('degrees.*.studyFormat').trim().escape().notEmpty().withMessage('Each degree study format must not be empty')
    .isIn(Object.values(StudyFormat))
    .withMessage(`Each degree study format must be one of the following values: ${Object.values(StudyFormat)}`),
  body('degrees.*.grade').trim().escape().notEmpty().withMessage('Each degree grade must not be empty')
    .isIn(Object.values(AcademicGrade))
    .withMessage(`Each degree grade must be one of the following values: ${Object.values(AcademicGrade)}`),
  body('majors').trim().escape().notEmpty().withMessage('Each degree major must not be empty')
    .isLength({ max: 255 }).withMessage('Each degree major must be at most 255 characters long'),

  body('certificates').isArray({ min: 0, max: 50 }).withMessage('Certificates must be an array of up to 50 elements'),
  body('certificates.*.issueDate').trim().escape().notEmpty().withMessage('Each certificate issue date must not be empty')
    .isISO8601().withMessage('Each certificate issue date must be a valid date in ISO 8601 format'),
  body('certificates.*.score').trim().escape().notEmpty().withMessage('Each certificate score must not be empty')
    .isFloat({ min: 0 }).withMessage('Each certificate score must be a positive number'),
  body('certificates.*.id').trim().escape().notEmpty().withMessage('Each certificate ID must not be empty')
    .isInt({ min: 1 }).withMessage('Each certificate ID must be a positive integer'),

  body('expertise').trim().escape().notEmpty().withMessage('Expertise must not be empty')
    .isInt({ min: 0, max: 50 }).withMessage('Expertise must be an integer between 0 and 50'),
  body('biography').trim().escape().notEmpty().withMessage('Biography must not be empty')
    .isLength({ max: 1022 }).withMessage('Biography must be at most 1022 characters long'),
  body('dateOfBirth').trim().escape().notEmpty().withMessage('Age must not be empty')
    .isISO8601().withMessage('Date of birth must be a valid date in ISO 8601 format'),
  body('nationalityId').trim().escape().notEmpty().withMessage('Natinality ID must not be empty')
    .isInt({ min: 1 }).withMessage('Nationality ID must be a positive integer')
];

const update = [
  param('id').trim().escape().notEmpty().withMessage('ID must not be empty')
    .isUUID().withMessage('ID must be a valid UUID'),
  body('degrees').isArray({ min: 0, max: 10 }).withMessage('Degrees must be an array of up to 10 elements'),
  body('degrees.*.rank').trim().escape().notEmpty().withMessage('Each degree rank must not be empty')
    .isIn(Object.values(AcademicRank)).withMessage(`Each degree rank must be one of the following values: ${Object.values(AcademicRank)}`),
  body('degrees.*.major').trim().escape().notEmpty().withMessage('Each degree major must not be empty')
    .isLength({ max: 255 }).withMessage('Each degree major must be at most 255 characters long'),
  body('degrees.*.issueDate').trim().escape().notEmpty().withMessage('Each degree issue date must not be empty')
    .isISO8601().withMessage('Each degree issue date must be a valid date in ISO 8601 format'),
  body('degree.*.universityId').trim().escape().notEmpty().withMessage('Each degree university ID must not be empty')
    .isInt({ min: 1 }).withMessage('Each degree university ID must be a positive integer'),
  body('degrees.*.studyFormat').trim().escape().notEmpty().withMessage('Each degree study format must not be empty')
    .isIn(Object.values(StudyFormat))
    .withMessage(`Each degree study format must be one of the following values: ${Object.values(StudyFormat)}`),
  body('degrees.*.grade').trim().escape().notEmpty().withMessage('Each degree grade must not be empty')
    .isIn(Object.values(AcademicGrade)),

  body('expertise').trim().escape().notEmpty().withMessage('Expertise must not be empty')
    .isInt({ min: 0, max: 50 }).withMessage('Expertise must be an integer between 0 and 50'),
  body('biography').trim().escape().notEmpty().withMessage('Biography must not be empty')
    .isLength({ max: 1022 }).withMessage('Biography must be at most 1022 characters long'),
  body('age').trim().escape().notEmpty().withMessage('Age must not be empty')
    .isInt({ min: 18, max: 65 }).withMessage('Age must be an integer between 18 and 65'),
  body('nationalityId').trim().escape().notEmpty().withMessage('Natinality ID must not be empty')
    .isInt({ min: 1 }).withMessage('Nationality ID must be a positive integer')
];

const deletingById = [...gettingById];


const InstructorValidator = { creation, update, gettingById, deletingById };
export default InstructorValidator;
