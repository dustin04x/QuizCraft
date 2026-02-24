const rawQuestions = {
  'Programming Fundamentals': [
    {
      question: 'Which JavaScript keyword creates a constant binding?',
      answers: ['const', 'let', 'var', 'static'],
      correctAnswer: 'const',
    },
    {
      question: 'In C, what does a pointer store?',
      answers: ['A memory address', 'A string value', 'A floating-point number', 'A CPU register'],
      correctAnswer: 'A memory address',
    },
    {
      question: 'What is the purpose of a base case in recursion?',
      answers: [
        'To stop infinite recursive calls',
        'To increase stack size',
        'To speed up compilation',
        'To create global variables',
      ],
      correctAnswer: 'To stop infinite recursive calls',
    },
    {
      question: 'What does OOP encapsulation mainly do?',
      answers: [
        'Bundles data and methods with controlled access',
        'Runs code in parallel',
        'Converts code to machine language',
        'Removes all bugs automatically',
      ],
      correctAnswer: 'Bundles data and methods with controlled access',
    },
    {
      question: 'Which command creates and switches to a new Git branch?',
      answers: ['git checkout -b feature-x', 'git branch -d feature-x', 'git pull feature-x', 'git commit -b'],
      correctAnswer: 'git checkout -b feature-x',
    },
    {
      question: 'What HTTP status code is typically returned when a resource is created?',
      answers: ['201', '200', '404', '500'],
      correctAnswer: '201',
    },
    {
      question: 'In Java, which method is the application entry point?',
      answers: ['main', 'start', 'init', 'runApp'],
      correctAnswer: 'main',
    },
    {
      question: 'TypeScript is mainly used to add what to JavaScript?',
      answers: ['Static types', 'Memory management', 'Automatic deployment', 'Native threading'],
      correctAnswer: 'Static types',
    },
    {
      question: 'What does IDE stand for?',
      answers: [
        'Integrated Development Environment',
        'Internal Data Engine',
        'Intelligent Debug Executor',
        'Indexed Deployment Element',
      ],
      correctAnswer: 'Integrated Development Environment',
    },
    {
      question: 'A good unit test should primarily test what?',
      answers: [
        'A small, isolated behavior',
        'The entire distributed system',
        'Only UI colors',
        'Network speed',
      ],
      correctAnswer: 'A small, isolated behavior',
    },
    {
      question: 'What does Python list comprehension return?',
      answers: ['A new list', 'A tuple only', 'A database cursor', 'A class instance'],
      correctAnswer: 'A new list',
    },
    {
      question: 'What is a compiler responsible for?',
      answers: ['Translating source code into lower-level code', 'Running SQL queries', 'Rendering CSS styles', 'Encrypting network packets'],
      correctAnswer: 'Translating source code into lower-level code',
    },
  ],
  'Data Structures & Algorithms': [
    {
      question: 'Which data structure follows FIFO order?',
      answers: ['Queue', 'Stack', 'Heap', 'Tree'],
      correctAnswer: 'Queue',
    },
    {
      question: 'Which data structure follows LIFO order?',
      answers: ['Stack', 'Queue', 'Graph', 'Hash map'],
      correctAnswer: 'Stack',
    },
    {
      question: 'What is the average time complexity of binary search?',
      answers: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'],
      correctAnswer: 'O(log n)',
    },
    {
      question: 'Average-case lookup in a hash table is usually:',
      answers: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      correctAnswer: 'O(1)',
    },
    {
      question: 'What is the typical time complexity of merge sort?',
      answers: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n^2)'],
      correctAnswer: 'O(n log n)',
    },
    {
      question: 'Which traversal strategy uses a queue?',
      answers: ['Breadth-First Search', 'Depth-First Search', 'In-order traversal', 'Backtracking only'],
      correctAnswer: 'Breadth-First Search',
    },
    {
      question: 'Depth-First Search is commonly implemented with:',
      answers: ['A stack or recursion', 'A queue only', 'A hash table only', 'A binary heap only'],
      correctAnswer: 'A stack or recursion',
    },
    {
      question: 'Dynamic programming is mainly about:',
      answers: [
        'Storing subproblem results to avoid recomputation',
        'Always using recursion without memory',
        'Sorting arrays in place',
        'Replacing loops with goto',
      ],
      correctAnswer: 'Storing subproblem results to avoid recomputation',
    },
    {
      question: 'In a Binary Search Tree, an in-order traversal returns values in:',
      answers: ['Sorted order', 'Reverse insertion order', 'Random order', 'Breadth-first order'],
      correctAnswer: 'Sorted order',
    },
    {
      question: 'In a max-heap, the parent node is:',
      answers: ['Greater than or equal to children', 'Always less than children', 'Always a leaf', 'Always the median'],
      correctAnswer: 'Greater than or equal to children',
    },
    {
      question: 'Dijkstra shortest-path algorithm assumes edge weights are:',
      answers: ['Non-negative', 'All negative', 'Only integers', 'All equal to 1'],
      correctAnswer: 'Non-negative',
    },
    {
      question: 'A connected acyclic undirected graph is called:',
      answers: ['A tree', 'A mesh', 'A DAG', 'A clique'],
      correctAnswer: 'A tree',
    },
  ],
  'Computer Networks': [
    {
      question: 'At which OSI layer does IP operate?',
      answers: ['Network layer', 'Transport layer', 'Session layer', 'Application layer'],
      correctAnswer: 'Network layer',
    },
    {
      question: 'TCP is considered:',
      answers: ['Connection-oriented and reliable', 'Connectionless and unreliable', 'Only for video streaming', 'A physical-layer protocol'],
      correctAnswer: 'Connection-oriented and reliable',
    },
    {
      question: 'UDP is often chosen when you need:',
      answers: ['Low overhead and low latency', 'Guaranteed delivery order', 'Built-in retransmissions', 'Three-way handshake'],
      correctAnswer: 'Low overhead and low latency',
    },
    {
      question: 'DNS is used to:',
      answers: ['Resolve domain names to IP addresses', 'Encrypt traffic', 'Route packets at Layer 2', 'Store HTML pages'],
      correctAnswer: 'Resolve domain names to IP addresses',
    },
    {
      question: 'Default port for HTTPS is:',
      answers: ['443', '80', '22', '53'],
      correctAnswer: '443',
    },
    {
      question: 'A subnet mask of 255.255.255.0 corresponds to:',
      answers: ['/24', '/16', '/30', '/8'],
      correctAnswer: '/24',
    },
    {
      question: 'A router primarily forwards traffic based on:',
      answers: ['IP addresses', 'MAC addresses', 'Port labels on cables', 'Process IDs'],
      correctAnswer: 'IP addresses',
    },
    {
      question: 'A switch typically makes forwarding decisions using:',
      answers: ['MAC addresses', 'DNS records', 'HTTP methods', 'TLS certificates'],
      correctAnswer: 'MAC addresses',
    },
    {
      question: 'NAT mainly helps by:',
      answers: ['Translating private and public IP addresses', 'Encrypting all packets', 'Replacing DNS', 'Eliminating firewalls'],
      correctAnswer: 'Translating private and public IP addresses',
    },
    {
      question: 'The TCP three-way handshake is:',
      answers: ['SYN, SYN-ACK, ACK', 'ACK, ACK, ACK', 'FIN, FIN-ACK, ACK', 'GET, OK, POST'],
      correctAnswer: 'SYN, SYN-ACK, ACK',
    },
    {
      question: 'ICMP is commonly used by:',
      answers: ['ping', 'ssh', 'smtp', 'https'],
      correctAnswer: 'ping',
    },
    {
      question: 'TLS mainly provides:',
      answers: ['Encrypted and authenticated communication', 'Routing between LANs', 'Database indexing', 'CPU virtualization'],
      correctAnswer: 'Encrypted and authenticated communication',
    },
  ],
  'Operating Systems': [
    {
      question: 'What is the primary role of the kernel?',
      answers: ['Manage hardware resources and core system services', 'Render web pages', 'Compile Java code', 'Store user photos'],
      correctAnswer: 'Manage hardware resources and core system services',
    },
    {
      question: 'Threads in the same process generally share:',
      answers: ['The same address space', 'Different disks', 'Different kernels', 'Different IP subnets'],
      correctAnswer: 'The same address space',
    },
    {
      question: 'Virtual memory allows the system to:',
      answers: ['Use disk to extend apparent RAM', 'Increase CPU frequency', 'Encrypt all files by default', 'Avoid context switching'],
      correctAnswer: 'Use disk to extend apparent RAM',
    },
    {
      question: 'A context switch occurs when:',
      answers: ['CPU switches from one task to another', 'RAM is upgraded', 'A file is deleted', 'A monitor changes resolution'],
      correctAnswer: 'CPU switches from one task to another',
    },
    {
      question: 'Which command changes file permissions on Linux?',
      answers: ['chmod', 'chown', 'grep', 'mkdir'],
      correctAnswer: 'chmod',
    },
    {
      question: 'PID stands for:',
      answers: ['Process Identifier', 'Program Input Device', 'Port Interface Driver', 'Protected Interrupt Domain'],
      correctAnswer: 'Process Identifier',
    },
    {
      question: 'Round-robin scheduling is based on:',
      answers: ['Fixed time slices', 'Priority inversion only', 'Single process execution', 'Disk size'],
      correctAnswer: 'Fixed time slices',
    },
    {
      question: 'System calls are used by applications to:',
      answers: ['Request services from the kernel', 'Define CSS variables', 'Train machine learning models', 'Open Bluetooth settings'],
      correctAnswer: 'Request services from the kernel',
    },
    {
      question: 'Paging divides memory into:',
      answers: ['Fixed-size pages', 'Only stacks', 'Only heaps', 'Variable-length records only'],
      correctAnswer: 'Fixed-size pages',
    },
    {
      question: 'What is a shell in Unix/Linux?',
      answers: ['A command interpreter', 'A firewall engine', 'A database schema', 'A CPU core'],
      correctAnswer: 'A command interpreter',
    },
    {
      question: 'A deadlock can happen when processes:',
      answers: ['Wait indefinitely for resources held by each other', 'Run in user mode', 'Use only one thread', 'Write logs frequently'],
      correctAnswer: 'Wait indefinitely for resources held by each other',
    },
    {
      question: 'Which of these is a Linux distribution?',
      answers: ['Ubuntu', 'IIS', 'PowerShell', 'PostgreSQL'],
      correctAnswer: 'Ubuntu',
    },
  ],
  'Databases & SQL': [
    {
      question: 'A primary key is used to:',
      answers: ['Uniquely identify each row', 'Store images', 'Encrypt records', 'Sort results automatically'],
      correctAnswer: 'Uniquely identify each row',
    },
    {
      question: 'A foreign key mainly enforces:',
      answers: ['Referential integrity', 'Disk compression', 'Client-side rendering', 'Thread synchronization'],
      correctAnswer: 'Referential integrity',
    },
    {
      question: 'Which SQL statement retrieves data?',
      answers: ['SELECT', 'DELETE', 'ALTER', 'DROP'],
      correctAnswer: 'SELECT',
    },
    {
      question: 'Which clause is used to filter rows?',
      answers: ['WHERE', 'ORDER BY', 'GROUP BY', 'JOIN'],
      correctAnswer: 'WHERE',
    },
    {
      question: 'An INNER JOIN returns:',
      answers: [
        'Rows with matching values in both tables',
        'All rows from left table only',
        'Only unmatched rows',
        'Exactly one row always',
      ],
      correctAnswer: 'Rows with matching values in both tables',
    },
    {
      question: 'An index generally helps:',
      answers: ['Speed up read queries', 'Increase query latency', 'Remove need for backups', 'Encrypt columns automatically'],
      correctAnswer: 'Speed up read queries',
    },
    {
      question: 'Normalization aims to:',
      answers: ['Reduce redundancy and anomalies', 'Store everything in one table', 'Avoid keys', 'Increase duplicate values'],
      correctAnswer: 'Reduce redundancy and anomalies',
    },
    {
      question: 'In ACID, Atomicity means:',
      answers: ['All-or-nothing transaction behavior', 'Fast indexing', 'Asynchronous replication', 'Automatic UI updates'],
      correctAnswer: 'All-or-nothing transaction behavior',
    },
    {
      question: 'COUNT(*) returns:',
      answers: ['Number of rows', 'Number of columns', 'Table name', 'Primary key value'],
      correctAnswer: 'Number of rows',
    },
    {
      question: 'GROUP BY is used with:',
      answers: ['Aggregate functions', 'Only DELETE operations', 'Kernel drivers', 'TLS certificates'],
      correctAnswer: 'Aggregate functions',
    },
    {
      question: 'Best defense against SQL injection is:',
      answers: ['Parameterized queries', 'String concatenation', 'Hiding error messages only', 'Changing table names daily'],
      correctAnswer: 'Parameterized queries',
    },
    {
      question: 'Which SQL command modifies existing rows?',
      answers: ['UPDATE', 'CREATE', 'TRUNCATE', 'USE'],
      correctAnswer: 'UPDATE',
    },
  ],
  'Web Development': [
    {
      question: 'Which HTML tag is semantically correct for navigation links?',
      answers: ['<nav>', '<div>', '<span>', '<main>'],
      correctAnswer: '<nav>',
    },
    {
      question: 'Which CSS declaration activates Flexbox?',
      answers: ['display: flex', 'position: flex', 'layout: flex', 'float: flex'],
      correctAnswer: 'display: flex',
    },
    {
      question: 'CSS Grid is best described as:',
      answers: ['A two-dimensional layout system', 'A JavaScript framework', 'A database model', 'An HTTP protocol'],
      correctAnswer: 'A two-dimensional layout system',
    },
    {
      question: 'fetch() in JavaScript returns:',
      answers: ['A Promise', 'An Array', 'A DOM node', 'A CSS rule'],
      correctAnswer: 'A Promise',
    },
    {
      question: 'localStorage data persists:',
      answers: ['Across browser sessions', 'Only during one function call', 'Only on the server', 'Only in private memory'],
      correctAnswer: 'Across browser sessions',
    },
    {
      question: 'Which HTTP method is idempotent and commonly used for full updates?',
      answers: ['PUT', 'POST', 'PATCH', 'CONNECT'],
      correctAnswer: 'PUT',
    },
    {
      question: 'In REST APIs, endpoints are usually modeled as:',
      answers: ['Nouns (resources)', 'Adjectives', 'Random numbers', 'File extensions'],
      correctAnswer: 'Nouns (resources)',
    },
    {
      question: 'JSON stands for:',
      answers: [
        'JavaScript Object Notation',
        'Java Source Open Network',
        'Joined Syntax Object Namespace',
        'Just Standard Ordered Nodes',
      ],
      correctAnswer: 'JavaScript Object Notation',
    },
    {
      question: 'CORS controls:',
      answers: [
        'Cross-origin request permissions',
        'Database schema migrations',
        'CPU thread priorities',
        'Terminal command aliases',
      ],
      correctAnswer: 'Cross-origin request permissions',
    },
    {
      question: 'SPA stands for:',
      answers: ['Single Page Application', 'Secure Port Access', 'Server Process Adapter', 'Static Protocol API'],
      correctAnswer: 'Single Page Application',
    },
    {
      question: 'HTTP 404 means:',
      answers: ['Resource not found', 'Created successfully', 'Server overloaded', 'Request timeout'],
      correctAnswer: 'Resource not found',
    },
    {
      question: 'WebSocket is mainly used for:',
      answers: ['Real-time bidirectional communication', 'Static image hosting', 'DNS lookup caching', 'Encrypting local files'],
      correctAnswer: 'Real-time bidirectional communication',
    },
  ],
  'Cybersecurity Basics': [
    {
      question: 'The CIA triad stands for:',
      answers: [
        'Confidentiality, Integrity, Availability',
        'Control, Inspection, Authorization',
        'Code, Interface, Access',
        'Certificate, Identity, Audit',
      ],
      correctAnswer: 'Confidentiality, Integrity, Availability',
    },
    {
      question: 'Phishing is primarily a:',
      answers: ['Social engineering attack', 'DDoS defense', 'File compression method', 'Code formatter'],
      correctAnswer: 'Social engineering attack',
    },
    {
      question: 'MFA adds security by requiring:',
      answers: ['More than one verification factor', 'Two passwords in one field', 'Only a username', 'Only a firewall'],
      correctAnswer: 'More than one verification factor',
    },
    {
      question: 'Principle of least privilege means:',
      answers: [
        'Give users only required permissions',
        'Give all users admin rights',
        'Disable all logging',
        'Use one shared account',
      ],
      correctAnswer: 'Give users only required permissions',
    },
    {
      question: 'A firewall is mainly used to:',
      answers: ['Filter network traffic by rules', 'Compile code faster', 'Render web pages', 'Create database indexes'],
      correctAnswer: 'Filter network traffic by rules',
    },
    {
      question: 'Patch management helps security by:',
      answers: ['Fixing known vulnerabilities', 'Increasing phishing emails', 'Disabling backups', 'Bypassing authentication'],
      correctAnswer: 'Fixing known vulnerabilities',
    },
    {
      question: 'Ransomware typically:',
      answers: ['Encrypts data and demands payment', 'Improves system performance', 'Only deletes browser cache', 'Creates backups automatically'],
      correctAnswer: 'Encrypts data and demands payment',
    },
    {
      question: 'A zero-day vulnerability is one that is:',
      answers: ['Unknown or unpatched at discovery time', 'Already fixed for years', 'Only in open-source apps', 'Impossible to exploit'],
      correctAnswer: 'Unknown or unpatched at discovery time',
    },
    {
      question: 'A VPN mainly provides:',
      answers: ['Encrypted tunnel over untrusted networks', 'Instant malware cleanup', 'Password hashing', 'Hardware virtualization'],
      correctAnswer: 'Encrypted tunnel over untrusted networks',
    },
    {
      question: 'Which backup strategy is widely recommended?',
      answers: ['3-2-1 rule', '1-1-1 rule', 'No backups, just RAID', 'Weekly screenshot backup only'],
      correctAnswer: '3-2-1 rule',
    },
    {
      question: 'Brute-force attacks try to:',
      answers: ['Guess credentials repeatedly', 'Inject SQL via comments', 'Sniff only DNS packets', 'Change BIOS settings remotely'],
      correctAnswer: 'Guess credentials repeatedly',
    },
    {
      question: 'Security awareness training is important because it:',
      answers: ['Reduces human-error attack success', 'Replaces firewalls entirely', 'Makes logs unnecessary', 'Removes need for updates'],
      correctAnswer: 'Reduces human-error attack success',
    },
  ],
  'Web Security': [
    {
      question: 'Cross-Site Scripting (XSS) allows attackers to:',
      answers: ['Inject malicious scripts into trusted pages', 'Bypass DNS entirely', 'Control physical routers directly', 'Compile JavaScript to C'],
      correctAnswer: 'Inject malicious scripts into trusted pages',
    },
    {
      question: 'SQL Injection happens when input is:',
      answers: ['Unsafely concatenated into SQL queries', 'Hashed with bcrypt', 'Sent over TLS', 'Stored in localStorage'],
      correctAnswer: 'Unsafely concatenated into SQL queries',
    },
    {
      question: 'CSRF attacks exploit:',
      answers: ['A logged-in user browser session', 'Weak CPU coolers', 'Broken Ethernet cables', 'Expired SSL only'],
      correctAnswer: 'A logged-in user browser session',
    },
    {
      question: 'HttpOnly cookie flag helps mitigate:',
      answers: ['Cookie theft via JavaScript access', 'DDoS at network layer', 'SQL query plans', 'Broken image loading'],
      correctAnswer: 'Cookie theft via JavaScript access',
    },
    {
      question: 'Content-Security-Policy (CSP) mainly mitigates:',
      answers: ['XSS risks', 'Power outages', 'DNS records mismatch', 'Kernel panics'],
      correctAnswer: 'XSS risks',
    },
    {
      question: 'Input validation should happen:',
      answers: ['On server side (and optionally client side)', 'Only in CSS', 'Only in browser extensions', 'After deployment only'],
      correctAnswer: 'On server side (and optionally client side)',
    },
    {
      question: 'Prepared statements protect against:',
      answers: ['SQL injection', 'Session timeout', 'Brute force on SSH keys', 'ICMP flooding'],
      correctAnswer: 'SQL injection',
    },
    {
      question: 'SameSite cookies can help mitigate:',
      answers: ['CSRF', 'ARP tables', 'Kernel memory leaks', 'DNS zone transfer'],
      correctAnswer: 'CSRF',
    },
    {
      question: 'JWT security best practice includes:',
      answers: ['Signature verification and expiration checks', 'Storing private keys in frontend', 'Using no algorithm', 'Sharing tokens publicly'],
      correctAnswer: 'Signature verification and expiration checks',
    },
    {
      question: 'TLS certificates are used to:',
      answers: ['Authenticate server identity', 'Speed up SQL joins', 'Hide source code comments', 'Allocate RAM'],
      correctAnswer: 'Authenticate server identity',
    },
    {
      question: 'Passwords should be stored as:',
      answers: ['Salted password hashes', 'Plain text', 'Reversible encrypted text with hardcoded key', 'Browser cookies'],
      correctAnswer: 'Salted password hashes',
    },
    {
      question: 'Rate limiting login attempts helps prevent:',
      answers: ['Credential brute-force attacks', 'XSS payload parsing', 'CSS injection', 'TCP checksum errors'],
      correctAnswer: 'Credential brute-force attacks',
    },
  ],
  Cryptography: [
    {
      question: 'Symmetric encryption uses:',
      answers: ['The same key for encrypt and decrypt', 'Public key only', 'Private key only', 'No key'],
      correctAnswer: 'The same key for encrypt and decrypt',
    },
    {
      question: 'Asymmetric encryption uses:',
      answers: ['A public/private key pair', 'A single shared password', 'Only hashes', 'Only salts'],
      correctAnswer: 'A public/private key pair',
    },
    {
      question: 'A cryptographic hash function should be:',
      answers: ['One-way and collision-resistant', 'Reversible by design', 'A compression format', 'A DNS resolver'],
      correctAnswer: 'One-way and collision-resistant',
    },
    {
      question: 'SHA-256 is typically used for:',
      answers: ['Hashing', 'Symmetric encryption', 'Packet routing', 'Video encoding'],
      correctAnswer: 'Hashing',
    },
    {
      question: 'Digital signatures are created with:',
      answers: ['Private key and verified by public key', 'Public key and verified by private key', 'Only shared key', 'No key material'],
      correctAnswer: 'Private key and verified by public key',
    },
    {
      question: 'AES is a:',
      answers: ['Symmetric block cipher', 'Hash algorithm', 'Asymmetric signature scheme', 'Key exchange protocol'],
      correctAnswer: 'Symmetric block cipher',
    },
    {
      question: 'RSA is commonly used for:',
      answers: ['Asymmetric encryption/signatures', 'Symmetric stream encryption', 'Compression', 'HTTP routing'],
      correctAnswer: 'Asymmetric encryption/signatures',
    },
    {
      question: 'Diffie-Hellman is used for:',
      answers: ['Secure key exchange', 'Password hashing', 'File compression', 'Database normalization'],
      correctAnswer: 'Secure key exchange',
    },
    {
      question: 'A nonce should be:',
      answers: ['Unique per operation', 'Hardcoded forever', 'Publicly secret', 'Always zero'],
      correctAnswer: 'Unique per operation',
    },
    {
      question: 'Adding a salt to password hashes helps against:',
      answers: ['Rainbow table attacks', 'Packet loss', 'SQL syntax errors', 'ARP spoofing'],
      correctAnswer: 'Rainbow table attacks',
    },
    {
      question: 'A Certificate Authority (CA) is trusted to:',
      answers: ['Issue and sign digital certificates', 'Host all websites', 'Encrypt all emails', 'Write browser code'],
      correctAnswer: 'Issue and sign digital certificates',
    },
    {
      question: 'TLS session keys are used to:',
      answers: ['Encrypt data in transit efficiently', 'Store browser history', 'Name DNS zones', 'Mount file systems'],
      correctAnswer: 'Encrypt data in transit efficiently',
    },
  ],
  'Cloud & DevOps': [
    {
      question: 'IaaS stands for:',
      answers: ['Infrastructure as a Service', 'Interface as a Script', 'Internal App Security', 'Integration and Storage'],
      correctAnswer: 'Infrastructure as a Service',
    },
    {
      question: 'PaaS typically provides:',
      answers: ['Managed platform to deploy apps', 'Only local desktop tools', 'Physical routers only', 'No runtime support'],
      correctAnswer: 'Managed platform to deploy apps',
    },
    {
      question: 'SaaS is:',
      answers: ['Software delivered as an online service', 'A CPU architecture', 'A file system driver', 'A DNS standard'],
      correctAnswer: 'Software delivered as an online service',
    },
    {
      question: 'Containers help by:',
      answers: ['Packaging app and dependencies together', 'Replacing source control', 'Disabling CI pipelines', 'Removing networking needs'],
      correctAnswer: 'Packaging app and dependencies together',
    },
    {
      question: 'A Dockerfile defines:',
      answers: ['How to build a container image', 'Cloud billing policy', 'TLS certificate chain', 'SQL schema relations'],
      correctAnswer: 'How to build a container image',
    },
    {
      question: 'Kubernetes is used to:',
      answers: ['Orchestrate containerized workloads', 'Compile Java bytecode', 'Encrypt PDFs', 'Edit video streams'],
      correctAnswer: 'Orchestrate containerized workloads',
    },
    {
      question: 'CI in software delivery means:',
      answers: ['Continuous Integration', 'Centralized Internet', 'Container Indexing', 'Code Isolation'],
      correctAnswer: 'Continuous Integration',
    },
    {
      question: 'CD often refers to:',
      answers: ['Continuous Delivery/Deployment', 'Code Deletion', 'Core Debugging', 'Cryptographic Decoding'],
      correctAnswer: 'Continuous Delivery/Deployment',
    },
    {
      question: 'Infrastructure as Code tool example:',
      answers: ['Terraform', 'Wireshark', 'Photoshop', 'Postman'],
      correctAnswer: 'Terraform',
    },
    {
      question: 'Blue-green deployment helps:',
      answers: ['Reduce downtime during releases', 'Increase CPU temperature', 'Avoid backups', 'Disable logging'],
      correctAnswer: 'Reduce downtime during releases',
    },
    {
      question: 'Monitoring in production should include:',
      answers: ['Metrics, logs, and alerts', 'Only screenshots', 'Only code comments', 'No error tracking'],
      correctAnswer: 'Metrics, logs, and alerts',
    },
    {
      question: 'Where should secrets be stored?',
      answers: ['In a dedicated secret manager', 'Inside source code repo', 'In public issue tracker', 'As plaintext in frontend JS'],
      correctAnswer: 'In a dedicated secret manager',
    },
  ],
}

export default rawQuestions
