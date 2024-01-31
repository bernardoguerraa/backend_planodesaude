import Doctor from "../../../../database/entities/Doctor";
import { inject, injectable } from 'tsyringe';
import DoctorRepository from "../../repository/DoctorRepository";
import Service from "../../../../database/repositories/Services";

type GetDoctor = {
    id: string;
};

@injectable()
export class GetDoctorByIdService implements Service<Doctor, Doctor[]>{
    private doctorRepository:DoctorRepository;
    constructor(
        @inject('DoctorRepository')doctorRepository: DoctorRepository,
    ){
        this.doctorRepository = doctorRepository;
    }

    async execute({id}:GetDoctor):Promise<Doctor[]>{
        const existingProfile = await this.doctorRepository.find({
            id:id
        });

        return existingProfile;
    }
}

