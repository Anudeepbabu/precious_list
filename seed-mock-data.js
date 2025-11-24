import dataService from './src/services/DataService.js';

const mockPeople = [
    {
        id: '1',
        name: "Jane Smith",
        relationship: "Spouse",
        email: "jane.smith@example.com",
        phone: "+1 555 123 4567",
        country: "USA",
        notes: "Primary beneficiary"
    },
    {
        id: '2',
        name: "Michael Doe",
        relationship: "Child",
        email: "michael.doe@example.com",
        phone: "+1 555 234 5678",
        country: "USA",
        notes: ""
    },
    {
        id: '3',
        name: "Sarah Doe",
        relationship: "Child",
        email: "sarah.doe@example.com",
        phone: "+1 555 345 6789",
        country: "UK",
        notes: ""
    },
    {
        id: '5',
        name: "David Chen",
        relationship: "Advisor",
        email: "david.chen@finance.com",
        phone: "+1 555 987 6543",
        country: "USA",
        notes: "Financial Advisor"
    }
];

const mockAssets = [
    {
        id: '1',
        name: "Chase Business Checking",
        category: "Financial Assets",
        type: "Bank Account",
        country: "USA",
        description: "Primary business account",
        accessDetails: "Account #: 1234567890, Branch: Manhattan",
        inheritor: "Jane Smith",
        executor: "Robert Wilson",
        recipient: "Jane Smith"
    },
    {
        id: '2',
        name: "Family Home - Hyderabad",
        category: "Real Estate",
        type: "Residential Property",
        country: "India",
        description: "Family residence in Jubilee Hills",
        accessDetails: "Property ID: HYD-2023-4567, Registry Office: Hyderabad",
        inheritor: "Jane Smith",
        executor: "Robert Wilson",
        recipient: "Jane Smith"
    },
    {
        id: '3',
        name: "Vanguard Index Fund",
        category: "Financial Assets",
        type: "Investment Account",
        country: "USA",
        description: "Retirement savings",
        accessDetails: "Account #: VG-9876543, Vanguard.com",
        inheritor: "Michael Doe",
        executor: "Jane Smith",
        recipient: "Michael Doe"
    },
    {
        id: '4',
        name: "GitHub Repository",
        category: "Digital Assets",
        type: "Code Repository",
        country: "USA",
        description: "Personal projects and code",
        accessDetails: "Username: johndoe, github.com/johndoe",
        inheritor: "Sarah Doe",
        executor: "David Chen",
        recipient: "Sarah Doe"
    },
    {
        id: '5',
        name: "Tesla Model 3",
        category: "Personal Property",
        type: "Vehicle",
        country: "USA",
        description: "Personal vehicle",
        accessDetails: "VIN: 5YJ3E1EA1KF123456, Registration: CA",
        inheritor: "Jane Smith",
        executor: "Jane Smith",
        recipient: "Jane Smith"
    }
];

const mockKnowledgeBase = [
    {
        id: '1',
        title: "Bank Accounts",
        category: "Financial Assets",
        content: "Checking, savings, and money market accounts. Requires death certificate and legal documentation to claim.",
        url: "",
        notes: "Contact bank with death certificate, executor documentation, and account details."
    },
    {
        id: '2',
        title: "Investment Accounts",
        category: "Financial Assets",
        content: "Brokerage accounts, mutual funds, stocks, and bonds. Transfer process varies by institution.",
        url: "",
        notes: "Contact brokerage with death certificate and beneficiary designation forms."
    },
    {
        id: '3',
        title: "Real Estate",
        category: "Real Estate",
        content: "Residential and commercial properties. Requires probate or trust documentation.",
        url: "",
        notes: "File with county recorder's office, may require probate court approval."
    },
    {
        id: '4',
        title: "Cryptocurrency",
        category: "Digital Assets",
        content: "Bitcoin, Ethereum, and other digital currencies. Requires private keys or seed phrases.",
        url: "",
        notes: "Access wallet with private keys. No central authority to contact."
    },
    {
        id: '5',
        title: "Life Insurance",
        category: "Financial Assets",
        content: "Term and whole life insurance policies. Beneficiaries must file claims.",
        url: "",
        notes: "Contact insurance company with death certificate and policy number."
    },
    {
        id: '6',
        title: "Retirement Accounts",
        category: "Financial Assets",
        content: "401(k), IRA, pension plans. Tax implications vary by account type.",
        url: "",
        notes: "Contact plan administrator with death certificate and beneficiary forms."
    },
    {
        id: '7',
        title: "Digital Subscriptions",
        category: "Digital Assets",
        content: "Streaming services, software licenses, cloud storage. May be non-transferable.",
        url: "",
        notes: "Contact service provider to cancel or transfer subscription."
    },
    {
        id: '8',
        title: "Vehicles",
        category: "Personal Property",
        content: "Cars, motorcycles, boats. Requires title transfer through DMV.",
        url: "",
        notes: "File title transfer with DMV, may require probate documentation."
    }
];

const mockDocuments = [
    {
        id: '1',
        name: "Asset Summary - Jane",
        type: "Spreadsheet",
        location: "Google Drive",
        notes: "Shared asset summary document",
        lastUpdated: "2024-11-23"
    },
    {
        id: '2',
        name: "Asset Summary - Michael",
        type: "Spreadsheet",
        location: "Google Drive",
        notes: "Shared asset summary document",
        lastUpdated: "2024-11-23"
    },
    {
        id: '3',
        name: "Asset Summary - Sarah",
        type: "Spreadsheet",
        location: "Google Drive",
        notes: "Shared asset summary document",
        lastUpdated: "2024-11-23"
    },
    {
        id: '4',
        name: "Legal Documents - Attorney",
        type: "PDF",
        location: "Secure Server",
        notes: "Legal documentation",
        lastUpdated: "2024-11-16"
    }
];

async function seedData() {
    try {
        console.log('🌱 Starting to seed mock data...\n');

        console.log('📝 Seeding People data...');
        await dataService.savePeople(mockPeople);
        console.log('✅ People data seeded\n');

        console.log('📦 Seeding Assets data...');
        await dataService.saveAssets(mockAssets);
        console.log('✅ Assets data seeded\n');

        console.log('📚 Seeding Knowledge Base data...');
        await dataService.saveKnowledgeBase(mockKnowledgeBase);
        console.log('✅ Knowledge Base data seeded\n');

        console.log('📄 Seeding Documents data...');
        await dataService.saveDocuments(mockDocuments);
        console.log('✅ Documents data seeded\n');

        console.log('🎉 All mock data successfully seeded to Google Sheets!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error.message);
        process.exit(1);
    }
}

seedData();
