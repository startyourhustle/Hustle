myApp.controller('ProjectProfileController', function(UserService, ProjectService, $mdDialog, $routeParams){
    console.log('ProjectProfileController created');
    const self = this;

    self.ProjectService = ProjectService;

    self.selectedProject = $routeParams.id

    ProjectService.getProjects();
    ProjectService.getProjectSkills();

    self.projectSkillArray = ProjectService.projectSkillArray
    self.projectArray = ProjectService.projectArray

    self.contactProjectOwner = ProjectService.contactProjectOwner
    self.uploadProjectPicture = ProjectService.uploadProjectPicture

      self.sendMessage = function(message){
          console.log('message: ', message);
      }


});
