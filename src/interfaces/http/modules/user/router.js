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
 *         type: string
 *         format: uuid
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       middleName:
 *         type: string
 *       email:
 *         type: string
 *       roleId:
 *         type: number
 *       isDeleted:
 *         type: number
 *       createdBy:
 *         type: string
 *         format: uuid
 */

  /**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a list of users
 *     security:
 *       - JWT: []
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
      getUseCase
        .all(req, res)
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
