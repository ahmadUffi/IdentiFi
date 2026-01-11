// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Identifi {
    struct Visibility {
        bool homeAddress;
        bool dateOfBirth;
        bool education;
        bool workHistory;
        bool phoneNumber;
    }

    struct BasicInfo {
        string firstName;
        string lastName;
        string email;
        string homeAddress;
        string phoneNumber;
        string dateOfBirth;
    }

    struct SocialLinks {
        string x;
        string instagram;
        string youtube;
        string linkedin;
        string tiktok;
    }

    struct ProfesionalInfo {
        string jobTitle;
        string info;
        string education;
        string workHistory;
        string[] skills;
        string imageURL;
    }

    struct User {
        string firstName;
        string lastName;
        string username;
        string email;
        string homeAddress;
        string phoneNumber;
        string dateOfBirth;

        string workHistory;

        string x;
        string instagram;
        string youtube;
        string linkedin;
        string tiktok;

        string jobTitle;
        string education;
        string info;
        string[] skills;
        string imageURL;

        bool exists;
        uint[] appliedJobs;
        Visibility visibility;
    }

    mapping (string => User) private users;
    mapping (address => string) private addressToUsername;
    mapping (string => bool) private usernameTaken;

    modifier onlyUniqueUsername(string memory _username) {
        require(!usernameTaken[_username], "Username already exists.");
        _;
    }

    function createUser(
        string memory _username,
        BasicInfo memory _basicInfo,
        ProfesionalInfo memory _profesionalInfo,
        SocialLinks memory _socialLinks,
        Visibility memory _visibility
    ) public onlyUniqueUsername(_username) {
        User storage newUser = users[_username];

        newUser.firstName = _basicInfo.firstName;
        newUser.lastName = _basicInfo.lastName;
        newUser.username = _username;
        newUser.email = _basicInfo.email;
        newUser.homeAddress = _basicInfo.homeAddress;
        newUser.dateOfBirth = _basicInfo.dateOfBirth;
        newUser.phoneNumber = _basicInfo.phoneNumber;

        newUser.x = _socialLinks.x;
        newUser.instagram = _socialLinks.instagram;
        newUser.youtube = _socialLinks.youtube;
        newUser.linkedin = _socialLinks.linkedin;
        newUser.tiktok = _socialLinks.tiktok;

        newUser.jobTitle = _profesionalInfo.jobTitle;
        newUser.education = _profesionalInfo.education;
        newUser.workHistory = _profesionalInfo.workHistory;
        newUser.info = _profesionalInfo.info;
        newUser.skills = _profesionalInfo.skills;
        newUser.imageURL = _profesionalInfo.imageURL;

        newUser.visibility = _visibility;
        newUser.exists = true;

        addressToUsername[msg.sender] = _username;
        usernameTaken[_username] = true;
    }

    function editUser(
        string memory _username,
        BasicInfo memory _basicInfo,
        ProfesionalInfo memory _profesionalInfo,
        SocialLinks memory _socialLinks,
        Visibility memory _visibility
    ) public {
        require(users[_username].exists, "User does not exist");
        // Optional owner check (uncomment to enforce):
        // require(keccak256(bytes(addressToUsername[msg.sender])) == keccak256(bytes(_username)), "Not profile owner");

        User storage u = users[_username];

        u.firstName = _basicInfo.firstName;
        u.lastName = _basicInfo.lastName;
        u.email = _basicInfo.email;
        u.homeAddress = _basicInfo.homeAddress;
        u.dateOfBirth = _basicInfo.dateOfBirth;
        u.phoneNumber = _basicInfo.phoneNumber;

        u.x = _socialLinks.x;
        u.instagram = _socialLinks.instagram;
        u.youtube = _socialLinks.youtube;
        u.linkedin = _socialLinks.linkedin;
        u.tiktok = _socialLinks.tiktok;

        u.jobTitle = _profesionalInfo.jobTitle;
        u.education = _profesionalInfo.education;
        u.workHistory = _profesionalInfo.workHistory;
        u.info = _profesionalInfo.info;
        u.skills = _profesionalInfo.skills;
        u.imageURL = _profesionalInfo.imageURL;

        u.visibility = _visibility;
    }

    function getUserByUsername(string memory _username)
        public
        view
        returns (
            BasicInfo memory basicInfo,
            ProfesionalInfo memory professionalInfo,
            SocialLinks memory socialLinks,
            Visibility memory visibility
        )
    {
        require(users[_username].exists, "User does not exist");
        User storage user = users[_username];

        basicInfo = BasicInfo(
            user.firstName,
            user.lastName,
            user.email,
            user.homeAddress,
            user.phoneNumber,
            user.dateOfBirth
        );

        professionalInfo = ProfesionalInfo(
            user.jobTitle,
            user.info,
            user.education,
            user.workHistory,
            user.skills,
            user.imageURL
        );

        socialLinks = SocialLinks(
            user.x,
            user.instagram,
            user.youtube,
            user.linkedin,
            user.tiktok
        );

        visibility = user.visibility;
    }

    function getUserByAddress(address _address)
        public
        view
        returns (
            BasicInfo memory basicInfo,
            ProfesionalInfo memory professionalInfo,
            SocialLinks memory socialLinks,
            Visibility memory visibility
        )
    {
        string memory usernameKey = addressToUsername[_address];
        return getUserByUsername(usernameKey);
    }

    function getUsernameBAddress(address _address) public view returns (string memory) {
        return addressToUsername[_address];
    }

    function setVisibility(
        string memory _username,
        bool education,
        bool workHistory,
        bool phoneNumber,
        bool dateOfBirth,
        bool homeAddress
    ) public {
        require(users[_username].exists, "User does not exist");
        User storage user = users[_username];
        user.visibility.education = education;
        user.visibility.workHistory = workHistory;
        user.visibility.phoneNumber = phoneNumber;
        user.visibility.dateOfBirth = dateOfBirth;
        user.visibility.homeAddress = homeAddress;
    }

    function getVisibility(string memory _username) public view returns (Visibility memory) {
        require(users[_username].exists, "User does not exist");
        return users[_username].visibility;
    }
}