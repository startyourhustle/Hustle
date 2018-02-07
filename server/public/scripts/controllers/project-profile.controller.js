myApp.controller('ProjectProfileController', function(UserService, ProjectService, $mdDialog, $routeParams){
    console.log('ProjectProfileController created');
    const self = this;

    self.ProjectService = ProjectService;


    ProjectService.getProjects();
    ProjectService.getSkills();
    ProjectService.getProjectProfile($routeParams.id);
    ProjectService.getProjectSkills($routeParams.id);
    ProjectService.getProjectCollaborators($routeParams.id)
    ProjectService.getCollaborationRequests($routeParams.id)

    self.projectSkillArray = ProjectService.projectSkillArray
    self.projectArray = ProjectService.projectArray
    self.projectProfile = ProjectService.projectProfile
    self.projectCollaboratorArray = ProjectService.projectCollaboratorArray
    self.rateCollaborator = ProjectService.rateCollaborator
    self.projectCollaborationRequestArray = ProjectService.projectCollaborationRequestArray
    self.acceptCollaboration = ProjectService.acceptCollaboration
    self.declineCollaboration = ProjectService.declineCollaboration

    self.contactProjectOwner = ProjectService.contactProjectOwner
    self.uploadProjectPicture = ProjectService.uploadProjectPicture
    self.sendMessage = ProjectService.sendMessage
    self.skillArray = ProjectService.skillArray;
    self.addProjectSkill = ProjectService.addProjectSkill




});
