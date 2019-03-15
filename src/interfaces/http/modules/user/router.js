const { Router } = require('express')
const Status = require('http-status')

module.exports = ({
  getUseCase,
  logger,
  response: { Success, Fail }
}) => {
  const router = Router()

  /**
 * @swagger
 * definitions:
 *   user:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *   company:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *   listing:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       createdBy:
 *         type: integer
 *   application:
 *     properties:
 *       id:
 *         type: integer
 *       coverLetter:
 *         type: string
 *       userId:
 *         type: integer
 *       listingId:
 *         type: integer
 *   top-active-user:
 *     properties:
 *       id:
 *         type: integer
 *       createdAt:
 *         type: date
 *       name:
 *         type: string
 *       count:
 *         type: integer
 *       listings:
 *         type: array
 *         items:
 *           $ref: '#/definitions/listing'
 */

  /**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a list of users
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/user'
 *       401:
 *        $ref: '#/responses/Unauthorized'
 */
  router
    .get('/', (req, res) => {
      const filters = {
        userId: req.query.userId || null,
        page: req.query.page || 0
      }
      getUseCase
        .all({ filters })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  /**
 * @swagger
 * /topActiveUsers:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a list top active users
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/top-active-user'
 *       401:
 *        $ref: '#/responses/Unauthorized'
 */
  router
    .get('/topActiveUsers', (req, res) => {
      const filters = {
        page: req.query.page || 0
      }
      getUseCase
        .getTopActiveUser({ filters })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  return router
}
