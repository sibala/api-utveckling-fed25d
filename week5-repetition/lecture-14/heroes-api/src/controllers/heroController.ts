import { Request, Response } from "express"
import { db } from '../config/db'
import { ResultSetHeader, RowDataPacket } from "mysql2"


export const fetchAllHeroes = async (req: Request, res: Response) => {    
    try {
        const [result] = await db.query<RowDataPacket[]>('SELECT * FROM heroes')
        res.json(result)
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

export const fetchHero = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const sql = `
            SELECT * FROM heroes 
            WHERE id = ?
        `
        const [result] = await db.query<RowDataPacket[]>(sql, [id])
        const hero = result[0]
        if (!hero) {
            res.status(404).json({message: 'Hero not found'})
        }
        res.json(hero)
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}



export const createHero = async (req: Request, res: Response) => {
    const {hero_name, civil_name, story} = req.body // Destructur JS Object
    if (hero_name === undefined || civil_name === undefined || story === undefined) {
        res.status(400).json({error: 'hero_name, civil_name and story are required'})
        return
    }

    try {
        const sql = `
            INSERT INTO heroes (hero_name, civil_name, story)
            VALUES (?, ?, ?)
        `;

        const [result] = await db.query<ResultSetHeader>(sql,[hero_name, civil_name, story]);
        console.log(result)
        res.status(201).json({message: 'Hero created', result: {id: result.insertId, hero_name: hero_name, civil_name: civil_name, story: story}})
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

export const updateHero = async (req: Request, res: Response) => {
    const {hero_name, civil_name, story} = req.body // Destructur JS Object
    if (hero_name === undefined || civil_name === undefined || story === undefined) {
        res.status(400).json({error: 'hero_name, civil_name and story are required'})
        return
    }

    try {
        const sql = `
            UPDATE heroes 
            SET hero_name = ?, civil_name = ?, story = ?
            WHERE id = ?
        `;

        const id = req.params.id
        const [result] = await db.query<ResultSetHeader>(sql, [hero_name, civil_name, story, id]
        );
        
        if (result.affectedRows === 0) {
            res.status(404).json({message: "Hero not found"})
            return // makes sure that we are done with this function, enabling other calls to work after
        }
    
        res.json({message: 'Hero updated'})
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}

export const deleteHero = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const sql = `
            DELETE FROM heroes 
            WHERE id = ?
        `;

        const [result] = await db.query<ResultSetHeader>(sql,[id]);
        if (result.affectedRows === 0) {
            res.status(404).json({message: "Hero not found"})
            return
        }
        res.json({message: 'Hero deleted'})
    } catch (error: unknown) {
        const message = error  instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({error: message})
    }
}
