import { inject, injectable } from "tsyringe";
import Service from "../../../../database/repositories/Services";
import Activity from "../../../../database/entities/Activity";
import ActivitiesRepository from "../../repository/ActivitiesRepository";
import UsersProfilesRepository from "../../../users/repository/UsersProfilesRepository";
import EntityPersistanceError from "../../../../shared/aplication/error/EntityPersistanceError";

interface GetActivitiesServiceParams {
    cpf: number;
}

@injectable()
export default class GetActivitiesByDoctorCpfService
    implements Service<GetActivitiesServiceParams, Activity[]>
{
    private activitiesRepository: ActivitiesRepository;
    private userProfileRepository: UsersProfilesRepository;

    constructor(
        @inject("ActivitiesRepository")
        activitiesRepository: ActivitiesRepository,
        @inject("UsersProfilesRepository")
        userProfileRepository: UsersProfilesRepository
    ) {
        this.userProfileRepository = userProfileRepository;
        this.activitiesRepository = activitiesRepository;
    }

    public async execute({cpf}:GetActivitiesServiceParams):Promise<Activity[]> {
        const existingDoctor = await this.userProfileRepository.findUserByCpf(cpf);

        if(!existingDoctor) {
            throw new EntityPersistanceError("Esse doutor nao existe");
        }

        const getActivity = await this.activitiesRepository.findByProviderId(existingDoctor.id);
        return getActivity;
    }
}