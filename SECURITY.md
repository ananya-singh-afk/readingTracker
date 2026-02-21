# Security Best Practices for Reading Tracker

## Credential Management

### AWS Access Keys
- **NEVER** commit `.env` file to git
- Always use `.env.example` as a template and share that instead
- Rotate access keys regularly (every 90 days recommended)
- Use AWS IAM roles instead of access keys when possible
- Create separate IAM users with minimal required permissions (principle of least privilege)

### Environment Variables
- Copy `.env.example` to `.env` locally
- Add `.env` to `.gitignore` (already configured)
- Never share `.env` file via email, Slack, or other communication channels
- Use secure vaults or secret management systems for team environments

## AWS Security

### IAM Permissions
The recommended IAM policy for this application should only include:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": [
        "arn:aws:dynamodb:*:YOUR_ACCOUNT_ID:table/reading_tracker_books",
        "arn:aws:dynamodb:*:YOUR_ACCOUNT_ID:table/reading_tracker_logs",
        "arn:aws:dynamodb:*:YOUR_ACCOUNT_ID:table/reading_tracker_goals"
      ]
    }
  ]
}
```

### DynamoDB Settings
- Use on-demand billing mode for this application (automatic scaling)
- Use encryption at rest (AWS managed keys)
- Enable point-in-time recovery for important data
- Regularly backup important data

## API Security

### CORS Configuration
- Only whitelisted domains can access the API
- Frontend is configured to use `localhost:5173` in development
- Update CORS settings before deploying to production

### Data Validation
- All inputs are validated using Pydantic models
- Implement request rate limiting for production
- Validate and sanitize all user inputs on the backend

## Development Best Practices

### Secrets in Code
- Never hardcode credentials
- Use environment variable convention: `ALL_CAPS_WITH_UNDERSCORES`
- Document all required environment variables in `.env.example`

### Git Security
- `.env` files are never tracked (configured in `.gitignore`)
- Use `git-secrets` or similar tools to prevent accidental commits
- Run `git status` before committing to verify no credentials are staged

### Deployment Requirements
Before deploying to production:
1. Update AWS credentials to production account
2. Update database table names if using separate tables
3. Update CORS allowed origins
4. Implement authentication/authorization
5. Enable HTTPS (use HTTP in development only)
6. Set up logging and monitoring
7. Use environment-specific configurations

## Future Security Enhancements

1. **Authentication**: Implement JWT-based authentication
2. **Authorization**: Add role-based access control (RBAC)
3. **Encryption**: Add data encryption for sensitive fields
4. **Audit Logging**: Log all operations for compliance
5. **Rate Limiting**: Implement request throttling
6. **Input Validation**: Add additional validation rules
7. **API Keys**: Replace IAM keys with rotating API keys
8. **Database**: Enable encryption at rest, backups, and replication

## Incident Response

If you suspect compromised credentials:
1. Immediately rotate the access key in AWS IAM console
2. Update `.env` file with new credentials
3. Restart the backend service
4. Review AWS CloudTrail for unauthorized activity
5. Monitor DynamoDB for suspicious activity

## References

- [AWS Security Best Practices](https://aws.amazon.com/security/best-practices/)
- [OWASP Application Security](https://owasp.org/)
- [Environment Variables Best Practices](https://12factor.net/config)
