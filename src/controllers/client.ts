import expres, { NextFunction, Request, Response } from 'express';
import prisma from '../db';
import { ErrorHandler } from '../helpers/error';

export async function createClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, userId, contactInfo, serviceId, address } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return next(new ErrorHandler('User Not Found !', 404));
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return next(new ErrorHandler('Service Not Found !', 404));
    }

    const newClient = await prisma.client.create({
      data: { userId, serviceId, name, contactInfo, address },
      select: {
        id: true,
        name: true,
        contactInfo: true,
        user: true,
        createdAt: true,
        address: true,
      },
    });

    res
      .status(200)
      .json({ msg: 'New Client Created Successfully !', data: newClient });
  } catch (error) {
    return next(
      new ErrorHandler('Create Client : Internal Server Error !', 500)
    );
  }
}

export async function updateClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, contactInfo, address } = req.body;
  const { id } = req.params;
  try {
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) },
    });

    if (!client) {
      return next(new ErrorHandler('Client Not Found !', 400));
    }

    const UpdatedClient = await prisma.client.update({
      where: { id: parseInt(id) },
      data: {
        name,
        contactInfo,
        address,
      },
      select: {
        id: true,
        name: true,
        contactInfo: true,
        address: true,
      },
    });

    res
      .status(200)
      .json({ msg: 'Client Updated Successfully', data: UpdatedClient });
  } catch (error) {
    return next(new ErrorHandler('Client: Internal Server Error!', 500));
  }
}

export async function deleteClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) },
    });

    if (!client) {
      return next(new ErrorHandler('Invalid Id or Client not Found !', 404));
    }

    await prisma.client.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ msg: 'Client is Deleted !' });
  } catch (error) {
    return next(
      new ErrorHandler('Delete Client: Internal Server Error !', 500)
    );
  }
}

export async function searchClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { query } = req.query;
  const { userId, serviceId } = req.params;

  if (!query || typeof query !== 'string') {
    return next(
      new ErrorHandler(
        'Query parameter is required and must be a string !',
        400
      )
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) },
    });
    if (!user) {
      return next(new ErrorHandler('User Not Exist Or Invalid User ID !', 404));
    }
    if (!service) {
      return next(new ErrorHandler('Invalid Service ID !', 404));
    }
    const clients = await prisma.client.findMany({
      where: {
        userId: parseInt(userId),
        serviceId: parseInt(serviceId),
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { contactInfo: { contains: query, mode: 'insensitive' } },
          { address: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    res.status(200).json({ msg: 'Searching Clients..', data: clients });
  } catch (error) {
    return next(new ErrorHandler('Internal Server Error !', 500));
  }
}

export async function getClients(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, serviceId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) },
    });
    if (!user) {
      return next(new ErrorHandler('User Not Exist Or Invalid User ID !', 404));
    }
    if (!service) {
      return next(new ErrorHandler('Invalid Service ID !', 404));
    }

    const clients = await prisma.client.findMany({
      where: {
        userId: parseInt(userId),
        serviceId: parseInt(serviceId),
      },
    });

    res.status(200).json({ msg: 'Clients Data', data: clients });
  } catch (error) {
    return next(new ErrorHandler('Get Clients: Internal Server Error!', 500));
  }
}
