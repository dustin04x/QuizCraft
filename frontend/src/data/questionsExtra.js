const extraQuestions = {
  'Programming Fundamentals': [
    {
      question: 'In JavaScript, what does === check?',
      answers: [
        'Value and type equality',
        'Value only equality',
        'Reference only equality',
        'String length equality',
      ],
      correctAnswer: 'Value and type equality',
    },
    {
      question: 'Which Git command displays commit history?',
      answers: ['git log', 'git status', 'git stash', 'git fetch'],
      correctAnswer: 'git log',
    },
    {
      question: 'Inheritance in OOP allows a class to:',
      answers: [
        'Reuse behavior from another class',
        'Run SQL directly',
        'Encrypt data automatically',
        'Replace all interfaces',
      ],
      correctAnswer: 'Reuse behavior from another class',
    },
    {
      question: 'What data type does Python len() return?',
      answers: ['Integer', 'String', 'Boolean', 'Float'],
      correctAnswer: 'Integer',
    },
    {
      question: 'Accessing an array element by index is usually:',
      answers: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 'O(1)',
    },
    {
      question: 'Git tags are mainly used to:',
      answers: [
        'Mark important points like releases',
        'Delete branches automatically',
        'Run tests in parallel',
        'Compress repositories',
      ],
      correctAnswer: 'Mark important points like releases',
    },
    {
      question: 'In C++, std::vector is best described as a:',
      answers: ['Dynamic array', 'Binary tree', 'Hash table', 'Message queue'],
      correctAnswer: 'Dynamic array',
    },
    {
      question: 'Which status code is common for a successful DELETE request?',
      answers: ['204', '201', '301', '503'],
      correctAnswer: '204',
    },
  ],
  'Data Structures & Algorithms': [
    {
      question: 'For shortest path in an unweighted graph, you usually use:',
      answers: ['Breadth-First Search', 'Dijkstra with negative weights', 'Merge sort', 'KMP'],
      correctAnswer: 'Breadth-First Search',
    },
    {
      question: 'Worst-case complexity of quicksort is:',
      answers: ['O(n^2)', 'O(log n)', 'O(n)', 'O(1)'],
      correctAnswer: 'O(n^2)',
    },
    {
      question: 'A priority queue is commonly implemented using a:',
      answers: ['Binary heap', 'Linked list only', 'Trie', 'B-tree only'],
      correctAnswer: 'Binary heap',
    },
    {
      question: 'A trie data structure is optimized for:',
      answers: ['Prefix-based string lookup', 'Matrix multiplication', 'Disk scheduling', 'Thread locking'],
      correctAnswer: 'Prefix-based string lookup',
    },
    {
      question: 'Space complexity of an adjacency matrix is:',
      answers: ['O(V^2)', 'O(V + E)', 'O(log V)', 'O(1)'],
      correctAnswer: 'O(V^2)',
    },
    {
      question: 'Topological sorting is valid only for:',
      answers: ['Directed acyclic graphs', 'Any cyclic graph', 'Undirected trees only', 'Hash tables'],
      correctAnswer: 'Directed acyclic graphs',
    },
    {
      question: 'The two-pointer technique is often useful on:',
      answers: ['Sorted arrays', 'Encrypted blobs only', 'Kernel modules', 'DNS zone files'],
      correctAnswer: 'Sorted arrays',
    },
    {
      question: 'Memoization is typically:',
      answers: [
        'Top-down caching of recursive subproblems',
        'Bottom-up table filling only',
        'A graph traversal order',
        'A database normalization rule',
      ],
      correctAnswer: 'Top-down caching of recursive subproblems',
    },
  ],
  'Computer Networks': [
    {
      question: 'Which protocol resolves IPv4 addresses to MAC addresses on a LAN?',
      answers: ['ARP', 'BGP', 'SMTP', 'RDP'],
      correctAnswer: 'ARP',
    },
    {
      question: 'How many usable host addresses are in a /30 subnet?',
      answers: ['2', '4', '6', '14'],
      correctAnswer: '2',
    },
    {
      question: 'Port numbers are handled at which OSI layer?',
      answers: ['Transport layer', 'Data link layer', 'Physical layer', 'Presentation layer'],
      correctAnswer: 'Transport layer',
    },
    {
      question: 'DHCP is used to:',
      answers: [
        'Automatically assign IP configuration',
        'Encrypt email attachments',
        'Cache web pages',
        'Mount network drives',
      ],
      correctAnswer: 'Automatically assign IP configuration',
    },
    {
      question: 'Default SSH port is:',
      answers: ['22', '25', '3306', '8080'],
      correctAnswer: '22',
    },
    {
      question: 'MTU refers to:',
      answers: [
        'Maximum size of a packet payload on a link',
        'Minimum TLS upgrade',
        'Main transfer utility process',
        'Memory table unit',
      ],
      correctAnswer: 'Maximum size of a packet payload on a link',
    },
    {
      question: 'HTTPS certificate validation helps prevent:',
      answers: ['Man-in-the-middle impersonation', 'Hard-disk fragmentation', 'Compiler errors', 'Local DNS cache'],
      correctAnswer: 'Man-in-the-middle impersonation',
    },
    {
      question: 'BGP is primarily used for:',
      answers: ['Routing between autonomous systems', 'Wi-Fi encryption', 'Database replication', 'Local printer sharing'],
      correctAnswer: 'Routing between autonomous systems',
    },
  ],
  'Operating Systems': [
    {
      question: 'Which CPU scheduling policy selects the shortest next burst?',
      answers: ['Shortest Job First', 'Round Robin', 'First Come First Served', 'Lottery only'],
      correctAnswer: 'Shortest Job First',
    },
    {
      question: 'A semaphore is mainly used for:',
      answers: ['Thread/process synchronization', 'Disk defragmentation', 'HTTP routing', 'Image rendering'],
      correctAnswer: 'Thread/process synchronization',
    },
    {
      question: 'fork() in Unix creates a:',
      answers: ['Child process', 'Kernel panic', 'Socket listener', 'Filesystem mount'],
      correctAnswer: 'Child process',
    },
    {
      question: 'Thrashing happens when a system:',
      answers: [
        'Spends too much time paging instead of executing',
        'Overuses compiler optimizations',
        'Drops all network packets',
        'Runs out of CPU cores permanently',
      ],
      correctAnswer: 'Spends too much time paging instead of executing',
    },
    {
      question: 'Swap space is typically located on:',
      answers: ['Disk storage', 'CPU cache', 'GPU VRAM', 'NIC firmware'],
      correctAnswer: 'Disk storage',
    },
    {
      question: 'On Linux, chmod 755 gives permissions:',
      answers: ['rwxr-xr-x', 'rw-rw-rw-', 'r--r--r--', 'rwx------'],
      correctAnswer: 'rwxr-xr-x',
    },
    {
      question: 'User mode differs from kernel mode because user mode:',
      answers: [
        'Has restricted access to privileged operations',
        'Can directly access all hardware',
        'Runs only one thread',
        'Disables interrupts permanently',
      ],
      correctAnswer: 'Has restricted access to privileged operations',
    },
    {
      question: 'A zombie process is a process that:',
      answers: [
        'Finished execution but still has an entry in the process table',
        'Consumes 100% CPU forever',
        'Is running in kernel mode only',
        'Cannot spawn child processes',
      ],
      correctAnswer: 'Finished execution but still has an entry in the process table',
    },
  ],
  'Databases & SQL': [
    {
      question: 'A LEFT JOIN returns:',
      answers: [
        'All rows from the left table plus matches from the right',
        'Only rows that match in both tables',
        'Only unmatched rows from both sides',
        'Rows from right table only',
      ],
      correctAnswer: 'All rows from the left table plus matches from the right',
    },
    {
      question: 'What does COMMIT do in SQL transactions?',
      answers: [
        'Permanently saves the transaction changes',
        'Rolls back all changes',
        'Creates a new table',
        'Drops indexes',
      ],
      correctAnswer: 'Permanently saves the transaction changes',
    },
    {
      question: 'HAVING is mainly used to:',
      answers: [
        'Filter grouped results after aggregation',
        'Sort rows alphabetically',
        'Join two tables by key',
        'Create a database user',
      ],
      correctAnswer: 'Filter grouped results after aggregation',
    },
    {
      question: 'Which normal form removes transitive dependencies?',
      answers: ['Third Normal Form (3NF)', 'First Normal Form (1NF)', 'BCNF only', 'Zero Normal Form'],
      correctAnswer: 'Third Normal Form (3NF)',
    },
    {
      question: 'Which index type is commonly good for range queries?',
      answers: ['B-tree index', 'Bitmap only', 'Heap table', 'Hash-only index'],
      correctAnswer: 'B-tree index',
    },
    {
      question: 'Denormalization often trades:',
      answers: [
        'More redundancy for faster reads',
        'Lower storage for slower writes',
        'Better security for less consistency',
        'Fewer tables for fewer joins and fewer indexes',
      ],
      correctAnswer: 'More redundancy for faster reads',
    },
    {
      question: 'NULL in SQL represents:',
      answers: ['Unknown or missing value', 'Zero', 'Empty string always', 'False boolean'],
      correctAnswer: 'Unknown or missing value',
    },
    {
      question: 'Which isolation level prevents dirty reads?',
      answers: ['Read Committed', 'Read Uncommitted', 'Snapshot Disabled', 'No Locking'],
      correctAnswer: 'Read Committed',
    },
  ],
  'Web Development': [
    {
      question: 'event.preventDefault() is used to:',
      answers: [
        'Stop the browser default action',
        'Automatically submit all forms',
        'Reload the page cache',
        'Disable JavaScript execution',
      ],
      correctAnswer: 'Stop the browser default action',
    },
    {
      question: 'Which header indicates JSON request/response body format?',
      answers: ['Content-Type: application/json', 'Cache-Control: no-cache', 'Accept-Language', 'Host'],
      correctAnswer: 'Content-Type: application/json',
    },
    {
      question: 'Compared with var, let is:',
      answers: ['Block-scoped', 'Function-scoped only', 'Read-only', 'Global by default'],
      correctAnswer: 'Block-scoped',
    },
    {
      question: 'What is the purpose of package-lock.json?',
      answers: [
        'Lock exact dependency versions for reproducible installs',
        'Store browser cookies',
        'Bundle CSS automatically',
        'Define route permissions',
      ],
      correctAnswer: 'Lock exact dependency versions for reproducible installs',
    },
    {
      question: 'Which CSS unit is relative to the root font size?',
      answers: ['rem', 'em', 'px', 'vw'],
      correctAnswer: 'rem',
    },
    {
      question: 'Debouncing an input handler is useful to:',
      answers: [
        'Limit how often a function runs during rapid typing',
        'Encrypt the input value',
        'Convert HTTP to HTTPS',
        'Disable client validation',
      ],
      correctAnswer: 'Limit how often a function runs during rapid typing',
    },
    {
      question: 'HTTP 401 usually means:',
      answers: ['Unauthorized', 'Resource moved permanently', 'Bad gateway', 'Request too large'],
      correctAnswer: 'Unauthorized',
    },
    {
      question: 'A Service Worker can help implement:',
      answers: ['Offline caching and background sync', 'SQL transaction locking', 'Kernel scheduling', 'DNS recursion'],
      correctAnswer: 'Offline caching and background sync',
    },
  ],
  'Cybersecurity Basics': [
    {
      question: 'SOC in security commonly means:',
      answers: ['Security Operations Center', 'System Output Controller', 'Secure Object Cache', 'Service Optimization Cloud'],
      correctAnswer: 'Security Operations Center',
    },
    {
      question: 'Vulnerability scanning is used to:',
      answers: [
        'Detect known weaknesses in systems',
        'Automatically patch every exploit',
        'Replace penetration testing forever',
        'Encrypt network traffic',
      ],
      correctAnswer: 'Detect known weaknesses in systems',
    },
    {
      question: 'Defense in depth means:',
      answers: [
        'Using multiple overlapping security controls',
        'Relying on one strong password policy only',
        'Blocking all internet traffic always',
        'Disabling user accounts permanently',
      ],
      correctAnswer: 'Using multiple overlapping security controls',
    },
    {
      question: 'SIEM platforms are mainly used for:',
      answers: ['Centralized log analysis and alerting', 'Compiling source code', 'Image segmentation', 'Database backups only'],
      correctAnswer: 'Centralized log analysis and alerting',
    },
    {
      question: 'CVE identifiers track:',
      answers: [
        'Publicly disclosed software vulnerabilities',
        'Corporate VPN endpoints',
        'Cloud billing invoices',
        'Network cable standards',
      ],
      correctAnswer: 'Publicly disclosed software vulnerabilities',
    },
    {
      question: 'A password manager improves security by:',
      answers: [
        'Storing unique strong passwords safely',
        'Using one shared password for all apps',
        'Removing the need for MFA',
        'Disabling account lockout',
      ],
      correctAnswer: 'Storing unique strong passwords safely',
    },
    {
      question: 'In incident response, containment aims to:',
      answers: ['Limit the spread and impact of the incident', 'Write postmortem only', 'Update UI labels', 'Install a new IDE'],
      correctAnswer: 'Limit the spread and impact of the incident',
    },
    {
      question: 'Endpoint protection tools primarily:',
      answers: ['Detect and block malware on devices', 'Replace all firewalls', 'Issue TLS certificates', 'Manage SQL schemas'],
      correctAnswer: 'Detect and block malware on devices',
    },
  ],
  'Web Security': [
    {
      question: 'The X-Frame-Options header helps reduce:',
      answers: ['Clickjacking attacks', 'SQL deadlocks', 'SMTP spoofing', 'Packet fragmentation'],
      correctAnswer: 'Clickjacking attacks',
    },
    {
      question: 'A CSRF token is used to:',
      answers: [
        'Verify that a state-changing request is intentional',
        'Hash user passwords',
        'Bypass CORS restrictions',
        'Sign JWTs in the browser',
      ],
      correctAnswer: 'Verify that a state-changing request is intentional',
    },
    {
      question: 'Output encoding is a key defense against:',
      answers: ['Cross-site scripting (XSS)', 'Brute-force on SSH', 'DNS cache poisoning', 'ARP spoofing'],
      correctAnswer: 'Cross-site scripting (XSS)',
    },
    {
      question: 'HSTS tells browsers to:',
      answers: [
        'Use HTTPS only for a domain',
        'Disable certificate checks',
        'Force HTTP fallback',
        'Cache JavaScript forever',
      ],
      correctAnswer: 'Use HTTPS only for a domain',
    },
    {
      question: 'JWT tokens should be validated:',
      answers: [
        'Server-side with signature and expiration checks',
        'Only in CSS',
        'Only by the browser UI',
        'Only once at login and never again',
      ],
      correctAnswer: 'Server-side with signature and expiration checks',
    },
    {
      question: 'An open redirect vulnerability can:',
      answers: ['Send users to attacker-controlled sites', 'Increase TLS key size', 'Patch SQL injection', 'Prevent phishing'],
      correctAnswer: 'Send users to attacker-controlled sites',
    },
    {
      question: 'X-Content-Type-Options: nosniff helps against:',
      answers: ['MIME-type confusion attacks', 'Password reuse', 'Kernel privilege escalation', 'DNS amplification'],
      correctAnswer: 'MIME-type confusion attacks',
    },
    {
      question: 'Broken access control means:',
      answers: [
        'Users can access resources without proper authorization',
        'Queries are too slow',
        'Images fail to load',
        'TLS uses weak ciphers only',
      ],
      correctAnswer: 'Users can access resources without proper authorization',
    },
  ],
  Cryptography: [
    {
      question: 'Which security property detects unauthorized message changes?',
      answers: ['Integrity', 'Availability', 'Non-repudiation only', 'Compression'],
      correctAnswer: 'Integrity',
    },
    {
      question: 'During TLS handshake, peers negotiate:',
      answers: ['Cipher suite and session keys', 'Database schema', 'File permissions', 'CPU clock speed'],
      correctAnswer: 'Cipher suite and session keys',
    },
    {
      question: 'Argon2, bcrypt, and scrypt are designed for:',
      answers: ['Password hashing', 'Video streaming', 'DNS forwarding', 'Image compression'],
      correctAnswer: 'Password hashing',
    },
    {
      question: 'Forward secrecy means:',
      answers: [
        'Past sessions stay secure even if long-term keys leak later',
        'All traffic is public by design',
        'No key exchange is needed',
        'Certificates never expire',
      ],
      correctAnswer: 'Past sessions stay secure even if long-term keys leak later',
    },
    {
      question: 'An IV (initialization vector) is mainly used to:',
      answers: [
        'Randomize encryption output for identical plaintexts',
        'Store private keys permanently',
        'Speed up hashing linearly',
        'Replace digital signatures',
      ],
      correctAnswer: 'Randomize encryption output for identical plaintexts',
    },
    {
      question: 'A MAC (message authentication code) provides:',
      answers: [
        'Integrity and authenticity with a shared secret',
        'Asymmetric key exchange',
        'Only data compression',
        'Network route discovery',
      ],
      correctAnswer: 'Integrity and authenticity with a shared secret',
    },
    {
      question: 'A digital certificate binds:',
      answers: [
        'A public key to an identity',
        'A password to a browser cookie',
        'A hash to a SQL query',
        'A router to an IP subnet',
      ],
      correctAnswer: 'A public key to an identity',
    },
    {
      question: 'Elliptic-curve cryptography is popular because it offers:',
      answers: [
        'Strong security with smaller key sizes',
        'No need for random numbers',
        'Instant brute-force resistance forever',
        'Only symmetric encryption',
      ],
      correctAnswer: 'Strong security with smaller key sizes',
    },
  ],
  'Cloud & DevOps': [
    {
      question: 'A rolling deployment means:',
      answers: [
        'Updating instances gradually instead of all at once',
        'Restarting all servers simultaneously',
        'Deleting old logs every minute',
        'Compiling in production only',
      ],
      correctAnswer: 'Updating instances gradually instead of all at once',
    },
    {
      question: 'Canary releases are used to:',
      answers: [
        'Expose a new version to a small traffic subset first',
        'Disable monitoring in staging',
        'Replace backups with snapshots only',
        'Force immediate global rollout',
      ],
      correctAnswer: 'Expose a new version to a small traffic subset first',
    },
    {
      question: 'Autoscaling helps by:',
      answers: [
        'Adjusting compute capacity based on demand',
        'Encrypting source code repositories',
        'Removing the need for load balancers',
        'Disabling health checks',
      ],
      correctAnswer: 'Adjusting compute capacity based on demand',
    },
    {
      question: 'Immutable infrastructure follows the rule:',
      answers: [
        'Replace servers instead of patching them in place',
        'Edit production files manually',
        'Keep one VM forever',
        'Avoid version control',
      ],
      correctAnswer: 'Replace servers instead of patching them in place',
    },
    {
      question: 'A common CI pipeline stage after build is:',
      answers: ['Automated test execution', 'Manual DNS editing', 'Hardware procurement', 'Disabling alerts'],
      correctAnswer: 'Automated test execution',
    },
    {
      question: 'kubectl apply is used to:',
      answers: [
        'Create or update Kubernetes resources from manifest files',
        'Compile Docker images without a Dockerfile',
        'Run SQL migrations in PostgreSQL',
        'Encrypt object storage buckets',
      ],
      correctAnswer: 'Create or update Kubernetes resources from manifest files',
    },
    {
      question: 'The three core observability signals are:',
      answers: ['Logs, metrics, and traces', 'Images, videos, and docs', 'CPU, GPU, and RAM only', 'Ports, VLANs, and routes'],
      correctAnswer: 'Logs, metrics, and traces',
    },
    {
      question: 'A staging environment is mainly useful to:',
      answers: [
        'Validate releases before production rollout',
        'Store customer secrets in plaintext',
        'Replace production entirely',
        'Run backups only once per year',
      ],
      correctAnswer: 'Validate releases before production rollout',
    },
  ],
}

export default extraQuestions

