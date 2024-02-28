import { inject, injectable } from "tsyringe";
import Clinic from "../../../../database/entities/Clinic";
import ClinicRepository from "../../../users/repository/ClinicRepository";
import Service from "../../../../database/repositories/Services";
import Activity from "../../../../database/entities/Activity";
import ActivitiesRepository from "../../repository/ActivitiesRepository";
import UsersProfilesRepository from "../../../users/repository/UsersProfilesRepository";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";

type GetClinicActivity = {
    cnpj: number;
};

@injectable()
export default class GetActivitiesByClinicCnpjService
    implements Service<GetClinicActivity, Activity[]>
{
    private activitiesRepository: ActivitiesRepository;
    private userProfileRepository: UsersProfilesRepository;

    constructor(
        @inject("ActivitiesRepository")
        activitiesRepository: ActivitiesRepository,
        @inject("UsersProfilesRepository")
        userProfileRepository: UsersProfilesRepository,
    ) {
        this.userProfileRepository = userProfileRepository;
        this.activitiesRepository = activitiesRepository;
    }

    public async execute({ cnpj }:GetClinicActivity):Promise<Activity[]> {
        const existingClinic = await this.userProfileRepository.findUserByCnpj(cnpj);

        if (!existingClinic) {
            throw new EntityPersistanceError("Essa clinica nao existe");
        }
        const getActivity = await this.activitiesRepository.findByProviderId(existingClinic.id);
        console.log(existingClinic.id);
        return getActivity;
    }
}